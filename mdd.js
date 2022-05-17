const Lexer = require('./lexer.js');
const ParserHTML = require('./parser_html.js');
const ParserLATEX = require('./parser_latex.js');
const { block } = require('./rules.js');


function mdd(src, format) {
  
  var tokens;
  
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
    console.log(tokens);

    if(format=="latex"){
      const out = ParserLATEX.parse(tokens);
      return out;
    }

    else{
      var out = ParserHTML.parse(tokens);
      var author='author'
      var year='year'
      var title='title'
      var description='description'

      if(block.html_author.exec(out)){
        author = block.html_author.exec(out)[1];
      }

      if (block.html_year.exec(out)){
        year= block.html_year.exec(out)[1]
      }

      if (block.html_title.exec(out)){
        title = block.html_title.exec(out)[1]
      }

      if (block.html_description.exec(out)){
        description= block.html_description.exec(out)[1];
      }

      out = out.replace('$$AUTHOR_MINDDO$$', author).replace('$$YEAR_MINDDO$$', year).replace('$$DESCRIPTION_MINDDO$$', description).replace('$$TITLE_MINDDO$$', title);
      out = out.replace(/\+ /gm, '&nbsp ');
      console.log(out)
      return out;
    }
  
  } catch (e) {
    e.message += '\nHay un error en el sistema';
    throw e;
  }
}

module.exports = {transform: mdd};