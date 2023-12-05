import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

export const characters = functions.region("asia-northeast1").https.onRequest((req, res) => {
  if (admin.apps.length === 0) {
    admin.initializeApp();
  }
  const database = admin.firestore();
  const storage = admin.storage();
  const id = req.path.split("/")[2];

  database
    .collection("characters")
    .where("id", "==", id)
    .get()
    .then(async (querySnapshot) => {
      const character = querySnapshot?.docs?.[0]?.data() ?? {};
      const name = character?.name ?? "";
      const imageName =
        character?.images !== undefined && character?.images?.length !== 0
          ? `${character.images[0].id}.${character.images[0].extension}`
          : "undefined.png";
      const [imageUrl] = await storage
        .bucket()
        .file(`characters/${imageName}`)
        .getSignedUrl({ action: "read", expires: Date.now() + 60 * 60 * 24 * 7 * 1000 });
      const html = createHtml(name, id, imageUrl);
      return res.set("Cache-Control", "public, max-age=600, s-maxage=600").status(200).end(html);
    });
});

const createHtml = (name: string, id: string, imageUrl: string) => {
  const title = escapeHtml(name);
  const description = "vinsanet | Kutulu TRPGキャラシツール";
  const siteUrl = "https://vinsanet.com";
  const url = `${siteUrl}/characters/${id}/view`;
  return `<!DOCTYPE html>
<html lang="ja">
  <head refix="og: http://ogp.me/ns#">
    <meta charset="UTF-8" />
    <link rel="icon" href="${process.env.MANIFEST_FAVICON_ICO}" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>vinsanet</title>
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:site_name" content="vinsanet" />
    <meta property="og:image" content="${imageUrl}" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content="@vinsanet_trpg" />
    <meta name="twitter:creator" content="@hnymA" />
    <script type="module" crossorigin src="${process.env.MANIFEST_INDEX_JS}"></script>
    <link rel="stylesheet" href="${process.env.MANIFEST_INDEX_CSS}">
  </head>
  <body>
    <div id="app"></div>

  </body>
</html>
`;
};

const escapeHtml = (text: string) => {
  return text.replace(/["&'<>]/g, (match: string) => {
    return { '"': "&quot;", "&": "&amp;", "'": "&#39;", "<": "&lt;", ">": "&gt;" }[match] as string;
  });
};
