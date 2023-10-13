const AirtablePlus = require("airtable-plus")

const airtable = new AirtablePlus({
    baseID: 'applndNXqBhD85DQt',
    apiKey: process.env.AIRTABLE_API_KEY,
    tableName: "chai"
})

export default async (req, res) => {
    if (req.method == "POST" && Object.keys(req.body).length != 0) {
        const record = await airtable.create({
            institution_name: req.body.institution_name,
            institution_picture: {
                url: req.body.institution_picture
            },
        });
    
        res.status(200).send(`Created record ${record.id}`)
    } else {
        res.status(400).send(`Couldn't create record.`)
    }
}