# Explicación básica

Esta librería está programada en Javascript haciendo uso de node.js unicamente para la modulación del código y poder hacer uso de comandos como 'require'. Así para poder modificar y debuggear el código es necesario tener instalado node.js y usar un comando como el siguiente:

> node mdd.js demo.md html  

Sin embargo debido a que se desea acceder a la librería facilmente desde una página web, se debe de usar browserify para crear un solo documento a llamar. 

> browserify mdd.js --standalone mdd > dist/mdd.min.js

La librería se usa al correr la función market(src) en src/market.js. Donde el parámetro que se pasa es el texto a traducir. 

```
translation = marked('# Marked in browser\n\nRendered by **marked**.')
```

La función market(src) primero llama a Lexer para crear los tokens, y luego le pasa estos tokens al parser, quien devuelve finalmente el texto traducido. 

```
const tokens = Lexer.lex(src, opt);
return Parser.parse(tokens, opt);
```

# TODO LIST

El redex de paragraph está hardcodeado para detectar unicamente parrafos de 2 lineas. 
