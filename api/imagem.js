export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).send("ID da imagem não informado");
  }

  const imageUrl = `https://drive.google.com/thumbnail?id=${id}&sz=w1200`;

  try {
    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error("Erro ao carregar imagem");
    }

    const buffer = await response.arrayBuffer();

    res.setHeader("Content-Type", "image/webp");
    res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate=604800");

    res.status(200).send(Buffer.from(buffer));
  } catch (error) {
    res.status(500).send("Erro ao carregar imagem");
  }
}
