const { CONNREFUSED } = require('dns');
const path = require('path');
const fs = require('fs');
const dataPath = path.join(__dirname, '..', 'database', 'cards.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
const postCard = (req, res) => {
  if (req.method === 'POST') {
    const description = req.body.description;
    const title = req.body.title;
    if (description && title) {
      let lastID = 0;
      data.forEach((element) => {
        if (Number(element.id) > lastID) {
          lastID = Number(element.id);
        }
      });
      const newID = lastID + 1;
      console.log(newID);
      const jsonData = {
        id: newID.toString(),
        name: title,
        description: description,
      };
      data.push(jsonData);
      fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
      console.log(`Received`, description);
      res.send(`POST received! ${description}`);
    } else {
      res.send('Failed');
    }
  } else {
    res.sendFile(path.join(__dirname, '../public/templates/post.html'));
  }
};

module.exports = postCard;
