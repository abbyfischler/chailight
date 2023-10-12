const AirtablePlus = require("airtable-plus")

const airtable = new AirtablePlus({
    baseID: 'applndNXqBhD85DQt',
    apiKey: process.env.AIRTABLE_API_KEY,
    tableName: "Names"
})

export default async (req, res) => {
    if (req.query.name) {
        const record = await airtable.create({institution_name: req.query.institution_name},{institution_picture: req.query.institution_picture});
    
        res.status(200).send(`Created record ${record.id}`)
    } else {
        res.status(400).send(`Couldn't create record.`)
    }
}