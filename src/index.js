// function convert(input, source, target) {
//     let s=0;  let str='';
//     for (let i=0; i<input.length; i++) {
        
//       s=s*source.length+source.indexOf(input[i]);
//     }
//     while (s>0) {
//         console.log(s/target.length);
//       str=target[s%target.length]+str;
//       s=Math.floor(s/target.length);
//     }  
//     return str ? str : target[0];
//   }

//   var Alphabet = {
//     BINARY:        '01',
//     OCTAL:         '01234567',
//     DECIMAL:       '0123456789',
//     HEXA_DECIMAL:  '0123456789abcdef',
//     ALPHA_LOWER:   'abcdefghijklmnopqrstuvwxyz',
//     ALPHA_UPPER:   'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
//     ALPHA:         'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
//     ALPHA_NUMERIC: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
//   };

//   console.log(convert("1010", Alphabet.BINARY, Alphabet.ALPHA_NUMERIC));