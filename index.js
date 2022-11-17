const TeleBot = require("telebot");
const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");
const bot = new TeleBot("5492681556:AAGx6MC2bK6422g9y9tLyDOX9oKkF_5EFwE");

bot.on("/do", (data) => {
  const { entities } = data;
  const entityUrl = entities.find((e) => e.type === "url");
});

bot.on("text", async (data) => {
  const { entities, text } = data;
  const entityUrl = entities.find((e) => e.type === "url");
  if (!entityUrl) return;

  const url = text.substring(entityUrl.offset, entityUrl.length);
  if (!url) return;

  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: ["load", "domcontentloaded", "networkidle0", "networkidle2"],
  });
  const screenshot = path.join("screenshot", "screenshot.png");
  await page.screenshot({ path: screenshot });
  await browser.close();
  const photo = fs.readFileSync(screenshot);
  data.reply.photo(photo);
  data.reply.text("Done!");
});

bot.start();
