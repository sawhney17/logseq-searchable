import '@logseq/libs';
import { SettingSchemaDesc } from '@logseq/libs/dist/LSPlugin.user';
import Tesseract from 'tesseract.js';

let settings: SettingSchemaDesc[] = [{
  key: "languageCode",
  type: "string",
  title: "target Language in language code",
  description: "Enter the language you are most likely to use with the extension. The language should be in the form of a language code, from this list. https://tesseract-ocr.github.io/tessdoc/Data-Files#data-files-for-version-400-november-29-2016",
  default: "eng"
}]
logseq.useSettingsSchema(settings)
async function convertImageToText(e) {
  let path = (await logseq.App.getCurrentGraph()).path
  console.log(path)
  let text = (await logseq.Editor.getBlock(e.uuid)).content
  let formattedText = text.replace(`../assets/`, `${path}/assets/`)
  let link = formattedText.match(/(?<=!\[.*?\])\((.*?)\)/g)[0]
  //remove the first and last character from link
  link = link.substring(1, link.length - 1)
  logseq.App.showMsg("Processing OCR!")
  Tesseract.recognize(
    link,
    logseq.settings.languageCode,
    { logger: m => console.log(m) }
  ).then(({ data: { text } }) => {
    // remove all line breaks from text
    text = text.replace(/\n/g, '')
    logseq.App.showMsg("Results inserted!")
    logseq.Editor.upsertBlockProperty(e.uuid, "ocr", text)
  })

}


const main = async () => {
  console.log('ocr plugin loaded');
  logseq.Editor.registerSlashCommand('Perform OCR on Text', async (e) => {
    convertImageToText(e);
  }
  )
}

logseq.ready(main).catch(console.error);
