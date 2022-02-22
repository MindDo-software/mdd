  
/**
 * Parsing & Compiling
 */
module.exports = class ParserHTML {
  constructor() {
    
  }

  /**
   * Static Parse Method
   */
  static parse(tokens) {
    const parser = new ParserHTML();
    return parser.parse(tokens);
  }


  /**
   * Parse Loop
   */
  parse(tokens) {
    //console.log(tokens)
    let out = '';
    let i, token, txt;
    const l = tokens.length;

    for (i = 0; i < l; i++) {
      token = tokens[i];

      switch (token.type) {

        case 'document': {
          const interior= ParserHTML.parse(token.tokens)
          txt='<!DOCTYPE html>\n<html lang="'+token.language+'">\n'+interior+ '\n\n</html>'
          out += txt;
          continue;
        }

        case 'metadata': {
          const interiorMeta= ParserHTML.parse(token.tokens1)
          const interiorBody= ParserHTML.parse(token.tokens2)
          txt='\n<head>\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n'+interiorMeta+ '</head>\n\n<body>\n<div class="topnav"><div>\n<a href="https://laylahrain.com/libros/0_libros/libros.html">LIBROS</a>\n<a href="https://laylahrain.com/blog/0_blog/blog.html">BLOG</a>\n<a class="imageButton" href="https://laylahrain.com"><img src="https://laylah-rain.github.io/source/logo.png" alt="Titulo"></img></a>\n<a href="https://laylahrain.com/curso/0_curso/curso.html">CURSO</a>\n<a href="https://laylahrain.com/arte/0_arte/arte.html">ARTE</a>\n</div>\n</div>\n'+interiorBody+'\n</body>'
          out += txt;
          continue;
        }

        case 'title': {
          txt='  <title>'+ token.text + '</title>\n';
          out += txt;
          continue;
        }

        case 'css': {
          txt='  <link rel="stylesheet"  href="'+ token.text + '">\n';
          out += txt;
          continue;
        }

        case 'meta': {
          txt='  <meta name="'+ token.name + '" content="'+token.content+'">\n';
          out += txt;
          continue;
        }

        case 'literature': {
          const interior= ParserHTML.parse(token.tokens)
          const header= "<div class='header'>\n<p class='title'>$$TITLE_MINDDO$$</p>\n<p class='author'>$$DESCRIPTION_MINDDO$$</p>\n<p class='description'>$$AUTHOR_MINDDO$$, $$YEAR_MINDDO$$</p>\n</div>\n\n"
          txt='<div class="literature">\n\n'+header+interior+ '</div>\n\n';
          out += txt;
          continue;
        }


        case 'details': {
          //console.log(token)
          const interior= ParserHTML.parse(token.tokens);
          txt='<div class="details">\n<details>\n  <summary>'+token.title+'</summary>\n<div>\n'+interior+'</div>\n</details>\n</div>\n\n';
          out += txt;
          continue;
        }

        case 'footer': {
          //console.log(token)
          console.log("ENTRO")
          const interior= ParserHTML.parse(token.tokens);
          txt='<footer>\n'+interior+'</footer>';
          out += txt;
          continue;
        }
        
        case 'heading': {
          const interior= ParserHTML.parse(token.tokens)
          txt='  <h' + token.depth + '>' + interior + '</h' + token.depth + '>\n';
          out += txt;
          continue;
        }

        case 'audio': {
          txt='<div class="audio">\n<audio controls>\n<source src="'+token.link+'" alt="'+token.title+'"type="audio/mpeg">\n</audio>\n</div>';
          out += txt;
          continue;
        }

        case 'image_link': {
          txt='<a target="_blank" href="'+token.external+'"><img src="'+token.link+'" alt="'+token.title+'"width="'+token.width+'"></img></a>\n';
          out += txt;
          continue;
        }

        case 'image_caption': {
          txt='<figure>\n<img src="'+token.link+'" alt="'+token.title+'"width="'+token.width+'">\n<figcaption>'+token.note+'</figcaption>\n</figure>\n';
          out += txt;
          continue;
        }

        case 'image_no_caption': {
          txt='<img src="'+token.link+'" alt="'+token.title+'"width="'+token.width+'"></img>\n';
          out += txt;
          continue;
        }

        case 'image_cover': {
          continue;
        }


        case 'poem': {
          const interior=ParserHTML.parse(token.tokens);
          txt='  <div class="poem">\n<div>\n' +interior+'\n</div>\n</div>\n';
          out += txt;
          continue;
        }

        case 'blockquote': {
          const interior=ParserHTML.parse(token.tokens);
          txt='  <blockquote>\n<div>\n' +interior+'\n</div>\n</blockquote>\n';
          out += txt;
          continue;
        }

        case 'comment': {
          txt='<div class="comment"\n'+ token.text+'\n</div>';
          out += txt;
          continue;
        }


        case 'list1': {
          const interior=ParserHTML.parse(token.tokens);
          txt='  <ul>\n' +interior+'  </ul>\n';
          out += txt;
          continue;
        }

        case 'list1_item': {
          const interior=ParserHTML.parse(token.tokens);
          txt='  <li>' +interior+'  </li>\n';
          out += txt;
          continue;
        }

        case 'note': {
          const interior= ParserHTML.parse(token.tokens);
          txt='<p id="n'+token.id+'">'+token.id+". "+interior +'<a class="ref" href="#ref'+token.id+'">&#8617</a></p>\n';
          out += txt;
          continue;
        }

        case 'marker': {
          txt='<div class="marker">* * *</div>\n';
          out += txt;
          continue;
        }

        case 'paragraph': {
          const interior= ParserHTML.parse(token.tokens);
          txt='  <p>' +interior +'</p>\n';
          out += txt;
          continue;
        }

        case 'link': {
          const previous= ParserHTML.parse(token.tokensPrevious)
          const next= ParserHTML.parse(token.tokensNext);
          txt=previous+'<a href="'+token.link+'" target="_blank">'+token.title+'</a>'+next;
          out += txt;
          continue;
        }


        case 'ref': {
          console.log("ENTRO")
          const previous= ParserHTML.parse(token.tokensPrevious)
          const text= ParserHTML.parse(token.tokensText);
          const next= ParserHTML.parse(token.tokensNext);
          txt=previous+'<a class="ref" href="#n'+token.id+'" id="ref'+token.id+'">'+text+'<sup>'+token.id+'</sup></a>'+next;
          out += txt;
          continue;
        }


        case 'bold_italic': {
          const previous= ParserHTML.parse(token.tokensPrevious)
          const text= ParserHTML.parse(token.tokensText);
          const next= ParserHTML.parse(token.tokensNext);
          txt=previous+'<b><i>'+text+'</i></b>'+next;
          out += txt;
          continue;
        }

        case 'bold': {
          const previous= ParserHTML.parse(token.tokensPrevious)
          const text= ParserHTML.parse(token.tokensText);
          const next= ParserHTML.parse(token.tokensNext);
          txt=previous+'<b>'+text+'</b>'+next;
          out += txt;
          continue;
        }

        case 'italic': {
          const previous= ParserHTML.parse(token.tokensPrevious)
          const text= ParserHTML.parse(token.tokensText);
          const next= ParserHTML.parse(token.tokensNext);
          txt=previous+'<i>'+text+'</i>'+next;
          out += txt;
          continue;
        }

        case 'text': {
          out += token.text;
          continue;
        }
        


      }
    }

    return out;
  }


};
