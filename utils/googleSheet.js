const sheets = require('../config/googleSheets');

const appendUser = async (name, email) => {

    try {

        await sheets.spreadsheets.values.append({

            spreadsheetId: process.env.GOOGLE_SHEET_ID,

            range: 'Sheet1!A:C',

            valueInputOption: 'USER_ENTERED',

            requestBody: {

                values: [
                    [
                        name,
                        email,
                        new Date().toLocaleString()
                    ]
                ]

            }

        });

        console.log("User added to Google Sheet");

    } catch (err) {

        console.log(err.message);

    }

};

module.exports = appendUser;