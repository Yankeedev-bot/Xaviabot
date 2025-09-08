import axios from "axios";

const config = {
  name: "ai",
  aliases: ["ask"],
  permissions: [0],
  usage: "[question]",
  cooldown: 10,
  description: "Interact with AI",
  credits: "rapido"
};

async function onCall({ message: m, args: ar }) {
  const q = ar.join(" ");
  if (!q) return m.reply("Please provide a question.");

  try {
    m.react("⏳");
    const res = await axios.get(`https://rapido.zetsu.xyz/api/gemini?chat=${encodeURIComponent(q)}`);
    /// the api has been changed, change if u want before u change this just check the response of api to make it works without any error
    
    m.react("✅");
    await m.reply(res.data.response);
  } catch (e) {
    m.react("❌");
    m.reply(e.message);
  }
}

export default { config, onCall };
