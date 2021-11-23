const Lexer = require('./lexer.js');
const ParserHTML = require('./parser_html.js');
const ParserLATEX = require('./parser_latex.js');
const { block } = require('./rules.js');


/**
 * Marked
 */
function mdd(src, format) {
  var tokens;

  // La entrara debe de ser un string
  if (typeof src === 'undefined' || src === null) {
    throw new Error('marked(): input parameter is undefined or null');
  }
  if (typeof src !== 'string') {
    throw new Error('marked(): input parameter is of type '
      + Object.prototype.toString.call(src) + ', string expected');
  }


  // Realiza la operación
  try {

    tokens = Lexer.lex(src);
    //console.log(tokens);

    if(format=="html"){
      //console.log(tokens);
      var out = ParserHTML.parse(tokens);
      //console.log(out);
      const author = block.html_author.exec(out)[1];
      const year = block.html_year.exec(out)[1];
      const title = block.html_title.exec(out)[1];
      const description = block.html_description.exec(out)[1];
      out = out.replace('$$AUTHOR_MINDDO$$', author).replace('$$YEAR_MINDDO$$', year).replace('$$DESCRIPTION_MINDDO$$', description).replace('$$TITLE_MINDDO$$', title);
      out = out.replace(/\+ /gm, '&nbsp ');
      return out;
    }

    if(format=="latex"){
      const out = ParserLATEX.parse(tokens);
      return out;
    }
  
  } catch (e) {
    e.message += '\nHay un error en el sistema';
    throw e;
  }
}

module.exports = {transform: mdd};