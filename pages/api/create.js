const AirtablePlus = require("airtable-plus");

const airtable = new AirtablePlus({
  baseID: "applndNXqBhD85DQt",
  apiKey: process.env.AIRTABLE_API_KEY,
  tableName: "chai",
});

export default async (req, res) => {
  if (req.query.institution_name && req.query.institution_picture) {
    const record = await airtable.create({
      institution_name: req.query.institution_name,
      institution_picture: req.query.image,
    });

    res.status(200).send(`Created record ${record.id}`);
  } else {
    res.status(400).send(`Couldn't create record.`);
  }
};
