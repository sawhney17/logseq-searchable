# Logaseq Searchable

A quick utility to conduct OCR parsing on images and insert the result as a property. Allows images to be indexable and therefore searchable by logseq similar to evernote. 

## Instructions
1. Install the plugin from the marketplace
2. Restart Logseq
3. Go to plugin settings and select the target language
    - The target language is important to be accurate in order for accuracy. Use a langauge code from this website. https://tesseract-ocr.github.io/tessdoc/Data-Files#data-files-for-version-400-november-29-2016
3. Use the slash command `/perform ocr on text`

## Tips
- Add this code to your custom.css file to hide block properties and make it so that the ocr property is not visible(warning will also hide all other block properties)
    - Will make the experience seamless
    ```css
    .block-properties {
    display: none;
}
    ```

## Limitations
1. Works best with images that just include text without diagrams and images

