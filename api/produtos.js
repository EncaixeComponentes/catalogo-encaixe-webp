const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSwVrzVeq7K0hUhUo2WVlBsABLpeU14UUvQnVrN5sxvWwlCIJVsdOBl7fxZmngnz1kv3iD1eEAPRGrM/pub?gid=0&single=true&output=csv";

export default async function handler(req, res) {
  try {
    const response = await fetch(SHEET_CSV_URL, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    if (!response.ok) {
      throw new Error("Erro ao carregar planilha");
    }

    const csv = await response.text();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");

    res.status(200).send(csv);
  } catch (error) {
    res.status(500).json({
      error: "Erro ao carregar catálogo",
      details: String(error)
    });
  }
}
