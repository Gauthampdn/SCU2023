require("dotenv").config()

const postdata = async (req, res) => {
  const appId = process.env.APPID;
  const hashToken = process.env.HASHTOKEN;
  const tokenUrl = `https://api.iq.inrix.com/auth/v1/appToken?appId=${appId}&hashToken=${hashToken}`;

  try {
    const tokenResponse = await fetch(tokenUrl);
    if (!tokenResponse.ok) {
      throw new Error('Failed to fetch token');
    }

    const tokenData = await tokenResponse.json();
    const appToken = tokenData.result.token;

    const routeUrl = `https://api.iq.inrix.com/findRoute?wp_1=37.770581%2C-122.442550&wp_2=37.765297%2C-122.442527&routeOutputFields=B%2CM%2CP%2CS%2CW&format=json`;


    const routeResponse = await fetch(routeUrl, {
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${appToken}`
      }
    });

    if (!routeResponse.ok) {
      throw new Error('Failed to fetch route information');
    }

    const routeData = await routeResponse.json();
    res.json(routeData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  postdata
};
