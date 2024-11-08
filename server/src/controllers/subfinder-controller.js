import { Subfinder } from "../modules/subfinder/subfinder.js";

export const startSubfinder = async (req, res) => {
  const { userId, scanType = "subdomains", domain } = req.body;
  try {
    const subfinder = new Subfinder({ userId, scanType, domain });
    const scan = await subfinder.start();
    return res.status(200).send({ message: "subfinder scan started", scan });
  } catch (error) {
    return res
      .status(400)
      .send({ message: "failed to start subfinder scan", error });
  }
};
