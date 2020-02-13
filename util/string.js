export default class StringUtil {
  constructor(text) { 
    this.text = text;
  }
  
  generateSlug() {
    return this.text.toLowerCase().replace(/\s/gmi, '-');
  }
}