
/**
 * Block-Level Grammar
 */
const block = {

  document: /\/\/ LANGUAGE:\s*(\S*)\s*/,
  metadata: /(\/\/ [^\n]*(?:\s|$)*)+/,
  title: /\/ TITLE:\s*([^\n]*)(?<!\s)\s*/,
  css: /\/ CSS:\s*([^\n]*)(?<!\s)\s*/,
  meta: /\/ ([^\n]*):\s*([^\n]*)(?<!\s)\s*/,
  image_link: /^\s*!!\[(.*?)]\((.*?)\)\((.*?)\)\((.*?)\)\s*/,
  image_caption:/^\s*!!\[(.*?)]\((.*?)\)\((.*?)\) *\n\*(.*)\*\s*/,
  image_no_caption:/^\s*!!\[(.*?)]\((.*?)\)\((.*?)\)\s*/,
  image_cover:/^\s*!!\[(.*?)]\s*/,
  audio:/^\s*!!!\[(.*?)]\((.*?)\)\s*/,
  literature: /^\s*-+\s*START_TEXT\s*-*\s*((.|\s)*?)-+\s*END_TEXT\s*-*\s*/,
  details: /^\s*\/-+\s# (.*)\s*((.|\s)*?\n)-+\/\s*/,
  footer: /^\s*\/-*\s*((?:.|\s)*?)\n-*\/\s*/,
  heading: /^\s*(#{1,6}) +([^\n]*)(?<!\s)\s*/,
  poem:/^\s*(>>>[^\n]*(?:\n|$))+\s*/,
  blockquote:/^\s*(>>[^\n]*(?:\n|$))+\s*/,
  comment:/^\s*```((?:\s|.)*?)```\s*/,
  list1:/^\s*(-- [^\n]*(?:\n|$))+\s*/,
  list1_item:/^\s*- ([^\n]*)(?<!\s)\s*(?:\n|$)+\s*/,
  note:/^\s*\[\^(.*?)\]: (.*)\s*/,
  marker: /^\s*\* \* \*\s*/,
  paragraph:/^(.+\n*.+)\n\n+/,
  line_break:/(.*)\n(.*)/,
  link:/(.*)!\[(.*?)]\((.*?)\)(.*)/,
  ref: /^(.*)\<(.*?)\[\^(.*?)\]\>(.*)/,
  bold_italic: /(.*)\*\*\*(.*?)\*\*\*(.*)/,
  bold: /(.*)\*\*(.*?)\*\*(.*)/,
  italic: /(.*)\*(.*?)\*(.*)/,
  html_author: /<meta name="AUTHOR" content="(.*)"\>\s/,
  html_year: /<meta name="YEAR" content="(.*)"\>\s/,
  html_description: /<meta name="DESCRIPTION" content="(.*)"\>\s/,
  html_title: /<title>(.*)<\/title\>/,

};


module.exports = {
  block,
};
