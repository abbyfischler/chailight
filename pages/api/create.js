const AirtablePlus = require("airtable-plus")

const airtable = new AirtablePlus({
    baseID: 'applndNXqBhD85DQt',
    apiKey: process.env.AIRTABLE_API_KEY,
    tableName: "Names"
})

export default async (req, res) => {
    if (req.query.name) {
        const record = await airtable.create({ Name: req.query.name});
        // should I add this: , Institution_picture: req.query.Institution_picture
        res.status(200).send(`Created record ${record.id}`)
    } else {
        res.status(400).send(`Couldn't create record.`)
    }
}