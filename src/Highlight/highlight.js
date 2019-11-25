export default class HighLight {
    constructor() {
        this.formatCode = this.formatCode.bind(this);
    }

    formatCode(code) {
        let codeText = code.textContent;
        let rows = codeText.split("\n");
        let codes = {};

        //const f

        // for (let i = 0; i < rows.length; i++) {
        //     let test = rows[i].match(/"([^\\"]|\\")*"/g);
        //     let snips = rows[i].match(/[-!$%^&*()_+|~=`{}[:;<>?,.@#\]]/g);

        //     console.log(rows[i]);
        // }

        rows = rows.filter(element => {
            return element.length !== 0;
        })

        for (let i = 0; i < rows.length; i++) {
            const formatting = (str) => {
                return str.replace(/[-!$%^&*()_+|~=`{}[:;<>?,.@#\]]/g, (m, n) => {
                    return "<span class=\"code-symbol\">" + m + "</span>"
                })
            }
            codes[i] = {};
            codes[i] = {
                original: rows[i],
                test: formatting(rows[i]),
                splittedSymbols: rows[i].match(/[-!$%^&*()_+|~=`{}[:;<>?,.@#\]]/g),
                splittedSymbolsTest: rows[i].split(/[-!$%^&*()_+|~=`{}[:;<>?,.@#\]]/g),
                string: rows[i].match(/"([^\\"]|\\")*"/g),
                splittedStringTest: rows[i].split(/"([^\\"]|\\")*"/g)
            }
        }

        let table = document.createElement("table");

        for (let key in codes) {
            let d = codes[key];
            let tr = document.createElement("tr");
            let td = document.createElement("td");

            var strReg1 = /"(.*?)"/g,
                strReg2 = /'(.*?)'/g,
                quis = /[-!$%^&*()_+|~=`{}[:;<>?,.@#\]]/g,
                specialReg = /\b(new|var|if|do|function|while|switch|for|foreach|in|continue|break)(?=[^\w])/g,
                specialJsGlobReg = /\b(document|window|Array|String|Object|Number|\$)(?=[^\w])/g,
                specialJsReg = /\b(getElementsBy(TagName|ClassName|Name)|getElementById|typeof|instanceof)(?=[^\w])/g,
                specialMethReg = /\b(indexOf|match|replace|toString|length)(?=[^\w])/g,
                specialPhpReg = /\b(define|echo|print_r|var_dump)(?=[^\w])/g,
                specialCommentReg = /(\/\*.*\*\/)/g,
                inlineCommentReg = /(\/\/.*)/g;

            var htmlTagReg = /(&lt;[^\&]*&gt;)/g;

            var sqlReg = /\b(CREATE|ALL|DATABASE|TABLE|GRANT|PRIVILEGES|IDENTIFIED|FLUSH|SELECT|UPDATE|DELETE|INSERT|FROM|WHERE|ORDER|BY|GROUP|LIMIT|INNER|OUTER|AS|ON|COUNT|CASE|TO|IF|WHEN|BETWEEN|AND|OR)(?=[^\w])/g;
            // let span = document.createElement("span");

            // for (let i = 0; i < d.splittedSymbols.length; i++) {
            //     d.formatted = d.original.replace(d.splittedSymbols[i], (m, n) => '<span class="code-symbol">' + m + '</span>')
            // }

            // if (d.string) {
            //     for (let i = 0; i < d.string.length; i++) {
            //         d.formatted = d.original.replace(d.string[i], (m, n) => '<span class="code-string">' + m + '</span>')
            //     }
            // }

            var string = d.original,
                parsed = string.replace(strReg1, '<span class="string">"$1"</span>');
            parsed = parsed.replace(strReg2, "<span class=\"string\">'$1'</span>");
            parsed = parsed.replace(quis, "<span class=\"quis\">=</span>");
            parsed = parsed.replace(specialReg, '<span class="special">$1</span>');
            parsed = parsed.replace(specialJsGlobReg, '<span class="special-js-glob">$1</span>');
            parsed = parsed.replace(specialJsReg, '<span class="special-js">$1</span>');
            parsed = parsed.replace(specialMethReg, '<span class="special-js-meth">$1</span>');
            parsed = parsed.replace(htmlTagReg, '<span class="special-html">$1</span>');
            parsed = parsed.replace(sqlReg, '<span class="special-sql">$1</span>');
            parsed = parsed.replace(specialPhpReg, '<span class="special-php">$1</span>');
            parsed = parsed.replace(specialCommentReg, '<span class="special-comment">$1</span>');
            parsed = parsed.replace(inlineCommentReg, '<span class="special-comment">$1</span>');

            //this.innerHTML = parsed;

            let test = parsed;
            td.innerHTML = test;
            tr.appendChild(td);
            table.appendChild(tr);
        }

        code.appendChild(table);
        console.log(codes);
    }
}