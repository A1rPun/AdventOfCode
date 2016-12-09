(function () {
    function getHighestCount(name, asc) {
        var commons = {};
        // Count all occurences in the name
        for (var i = 0; i < name.length; i++) {
            var key = name[i];
            if (!commons.hasOwnProperty(key))
                commons[key] = 0;
            commons[key]++;
        }
        // Create a most common checksum
        var mostCommons = [];
        for (var key in commons)
            mostCommons.push({ key: key, count: commons[key] });
        mostCommons = mostCommons.sort(asc
            ? function (a, b) { return b.count - a.count; }
            : function (a, b) { return a.count - b.count; });
        return mostCommons[0].key;
    }

    function day_6(errorCodes) {
        var frequent = '';
        var lessLikely = '';
        var chunks = [];
        for (var i = errorCodes.length; i--;) {
            var code = errorCodes[i];
            for (var j = code.length; j--;) {
                var chunk = chunks[j];
                if (chunk)
                    chunk.push(code[j]);
                else
                    chunks[j] = [code[j]];
            }
        }
        for (var i = 0; i < chunks.length; i++) {
            frequent += getHighestCount(chunks[i], true);
            lessLikely += getHighestCount(chunks[i]);
        }
        return new Promise.resolve([frequent, lessLikely]);
    }

    function getInput() {
        return [
            'bgpmxqws',
            'mxvdaluh',
            'wpgcrcix',
            'djugxgak',
            'urjgbqde',
            'vcsylkay',
            'ruyowwjt',
            'eepdbfaa',
            'kpzjujdv',
            'ilsbjxbf',
            'xljdcdpc',
            'vnmtqzbu',
            'dsiruyjs',
            'oemrvmqj',
            'bunqbyjw',
            'wixyxnwq',
            'tfmpgyen',
            'rxjphoyf',
            'keohkpwv',
            'gbpfqodg',
            'palgwnye',
            'zzriwene',
            'wmczggbk',
            'xikxduml',
            'estibkpk',
            'ivcghhot',
            'uvczidij',
            'qmdmpfxn',
            'xjgypmry',
            'xwzgzxeu',
            'ejvoqgyr',
            'qzbnawul',
            'mhtvpsma',
            'vzddmtyx',
            'ckhdphcd',
            'rrxiqrqd',
            'tdnauotp',
            'zsoqslob',
            'oxbleyra',
            'dfspawmw',
            'amewbjnz',
            'dhryqzsg',
            'gevzondd',
            'gjtlhacs',
            'ywoghawg',
            'xgiglflw',
            'jlfewwky',
            'xvhjgvhk',
            'baocvjcl',
            'wnweoaib',
            'uepsdnur',
            'vmynttbb',
            'aoqezdgl',
            'oahtcpli',
            'hixokbhp',
            'rsdwsjnv',
            'nqckpjlt',
            'jksheyvr',
            'asabcisr',
            'jirzozrt',
            'jypcypek',
            'hbeimsej',
            'vzwnchwy',
            'ozjqqyaz',
            'hbxcqvne',
            'yfmthknj',
            'yxicfnav',
            'fhfwaetl',
            'lyhvemqr',
            'kyyzkgfb',
            'unigfcbx',
            'jyszsjto',
            'qoomixgp',
            'vwqlvanp',
            'wteqnjhj',
            'dtcfvira',
            'wztxowzh',
            'rjuayajd',
            'mcvaqelp',
            'wazbrrej',
            'qwuiszub',
            'fohaxlyl',
            'vizomswk',
            'pkjhxghs',
            'xhygtcbp',
            'grzjvlas',
            'tgssuvej',
            'jypumznm',
            'ymiymxbk',
            'fdnhxmpc',
            'nqwlpigo',
            'ecpyhmgw',
            'hbxpvgoh',
            'pkflsrjo',
            'zrjugqge',
            'jwvlowtd',
            'mkslbbql',
            'hsektxsi',
            'psanaqop',
            'ylorypou',
            'tkfircdx',
            'ftkfzmno',
            'rdasheam',
            'eulndcvo',
            'gpetuqvl',
            'felsxwks',
            'xckkdvyc',
            'nlbymfrt',
            'gcqxmyse',
            'gbbnguow',
            'cdaduwiv',
            'sqikwrbi',
            'ppwteldh',
            'tyurlqsr',
            'oogkdood',
            'slxekxkj',
            'tunmorwo',
            'mphktfgp',
            'ylkifdek',
            'byopdakn',
            'zgpqnghe',
            'lltqwxuf',
            'palhjqcb',
            'xxrbywel',
            'xolycxlx',
            'bkiimxvx',
            'htztessk',
            'aamwgfrm',
            'extuovqh',
            'bpkmstaf',
            'hazuzhkf',
            'cjiqycqs',
            'sxafxxpp',
            'mtfowzth',
            'poosymcj',
            'vbykdleq',
            'bxhhfyak',
            'kbyminxs',
            'gviprbxv',
            'bqxhjffd',
            'wmuwlzoy',
            'iwazluuu',
            'uhwxfelq',
            'gfvqwfgj',
            'uqvyjkgr',
            'eanwjhhl',
            'izpooten',
            'gkqhaiel',
            'jforeagg',
            'hrqjylmb',
            'kcvfbohb',
            'jkoskwff',
            'ymuqatcy',
            'naeceeru',
            'alghunmu',
            'ygsgeyxy',
            'fhsxqtsx',
            'iikldgzj',
            'zwsdownm',
            'svbdvddw',
            'ujwdwmju',
            'puszwwxg',
            'pwzuivlo',
            'noqjcwqu',
            'lsnvidsn',
            'rhuvjosk',
            'rxktxanu',
            'iftbsfjc',
            'kgrxrkwl',
            'rfzknqde',
            'afqcjguq',
            'sghybsrn',
            'qtipzcwy',
            'yyqhuufw',
            'zaeukrhr',
            'rqtlcflu',
            'ridxvnur',
            'wcxzmvka',
            'pqxcddgq',
            'eetnhsux',
            'kblokhxx',
            'bmctwlgo',
            'cpojyilz',
            'yhnmkhjp',
            'btudgpci',
            'mzvjtlhh',
            'xabfbuvt',
            'jgoltfpy',
            'gsjdsaco',
            'bmxhpnri',
            'ncdkduzl',
            'jhzyshfz',
            'qhruewva',
            'cgkafvvm',
            'ntjbaria',
            'rpfxuhht',
            'wnqbudow',
            'bcezvcpt',
            'nqrhgrkn',
            'tceyjrqf',
            'pyszfamz',
            'nctlttmt',
            'bvhanhoc',
            'ilffiatn',
            'fwmskxwg',
            'vezsripn',
            'hbjxpdyd',
            'tjnpgdib',
            'tiuniqdj',
            'mrzlrnmn',
            'ngqrtjxr',
            'eoyorrfy',
            'rtkidptz',
            'zwglnkeu',
            'anjcxsgc',
            'dbuotxcq',
            'sqpsxbmt',
            'czyxgtcv',
            'ojhmhssl',
            'lfbhgnox',
            'pecipazx',
            'nvcfxguk',
            'gdniujcm',
            'tcdfhgez',
            'zxzybtvb',
            'oddtlvmw',
            'vxdcfivs',
            'ldgbhriu',
            'lcuccuup',
            'dwzyuvkh',
            'pdoomnps',
            'jfaqworq',
            'zfeecwuy',
            'zxytmbzh',
            'iuzcfqac',
            'kxvxqpam',
            'gyfryaqu',
            'dusowjue',
            'uwrofbxz',
            'jwhbtsgg',
            'tjpubrqi',
            'vncupbao',
            'lbusnztb',
            'kbpkhcau',
            'prrcxgti',
            'aflcpnsq',
            'xtspjvwl',
            'fqjgujib',
            'tnlahhpp',
            'boovsuro',
            'eytzygmd',
            'vdyysubn',
            'syxcupva',
            'ulgjkkdy',
            'pzhevrme',
            'vynmztwh',
            'wrwebmrb',
            'pdfniopo',
            'nnusdprq',
            'qzrnxboz',
            'fhvnyafq',
            'isbzhjnq',
            'nxfvcxvy',
            'iuzgpevj',
            'apjpvsdk',
            'unltokdk',
            'neccyyrf',
            'gkkafbth',
            'udnurvso',
            'gzosdaws',
            'snetsjdd',
            'zcsgluqb',
            'fdsvyiho',
            'kjvmexiu',
            'ugfpphts',
            'dbkvkdok',
            'drpkejfw',
            'lwyshtxq',
            'qilaojzn',
            'qilwixhi',
            'hbuzdkgg',
            'amdettxe',
            'rilvspmg',
            'cyvfwmwg',
            'kqbmwvvi',
            'nuxdfinf',
            'ozfvzigf',
            'vhjvfosm',
            'vfmgntex',
            'cswjzkft',
            'kvqqlvbh',
            'ppwpiqcb',
            'wewsncdj',
            'ndkjslvd',
            'livwaogi',
            'slupeobk',
            'chvlbixa',
            'oprvhtpn',
            'wrgwrzic',
            'meyhlwzr',
            'wcwplger',
            'cfdwqikc',
            'vokgnzjv',
            'sxmxzlwh',
            'rttwwsrg',
            'apqmweoc',
            'xcrgliqw',
            'egjenpzi',
            'uuaoghhw',
            'ubaubqir',
            'slxfrqfz',
            'uooravpz',
            'jukdeivx',
            'qvelgzzi',
            'zbcnzjsj',
            'noivjeht',
            'tomkyktn',
            'owixssbg',
            'qrjikjok',
            'opieopkj',
            'hzrratbf',
            'tawhmgiz',
            'zojlupqh',
            'iuxrcduy',
            'gxdvgzke',
            'tcsqiada',
            'oqanfwxs',
            'hoeavozw',
            'kteefzjp',
            'xjepfoho',
            'acaimhfz',
            'ifeqkbqc',
            'szwlvqwc',
            'jrtfkzxv',
            'aqgmlcyg',
            'stsejxzs',
            'mukbwojc',
            'yorhqkqz',
            'qgkehpbu',
            'qrpealli',
            'mcwerdgx',
            'vqxkeyqe',
            'pmstbkfy',
            'uriiqytq',
            'puyrfebm',
            'cljqpflg',
            'yhjxqfee',
            'wvyitlyj',
            'stvxunze',
            'surpasjh',
            'laqbwefs',
            'tmhzxhcp',
            'xnrmdgci',
            'cvoziimt',
            'dbeqiwio',
            'bncszppp',
            'wajpsycd',
            'ncmrinrp',
            'zsctcqzy',
            'vkfwzoda',
            'zeturmnd',
            'dydeylro',
            'gggkrwzw',
            'oobmkfhz',
            'vimgaxkq',
            'cuftcyxg',
            'jzczmzab',
            'jqvvaljj',
            'fvlbbduo',
            'tvoipipg',
            'ihdqovcz',
            'fhylllit',
            'wngiyeld',
            'panifluc',
            'nariaulb',
            'uiqpccns',
            'vdeevhcb',
            'fjddbcfa',
            'nymgtdmf',
            'qvkrocra',
            'lelplbmu',
            'qwajtxne',
            'cjgljjwm',
            'kdyecbii',
            'rmhccint',
            'meclgocv',
            'ahvvcbck',
            'uktuwuag',
            'dcnpzwjn',
            'igfbtmnr',
            'wdioghpd',
            'keuuecam',
            'clxwiylf',
            'oqsbygex',
            'dbxhlukg',
            'rkxjjlvn',
            'votomymd',
            'hqyfigpr',
            'qnuvattu',
            'flrxtbsl',
            'zinwdott',
            'wxpzgsxk',
            'glvwrzqv',
            'asruvcjq',
            'aanwzupj',
            'krbxlowc',
            'nfbrzogr',
            'ivvbjgyt',
            'mxbuttye',
            'rhzksroq',
            'skipgtsv',
            'wrfnmsgm',
            'ckdgipqw',
            'uxbylsdi',
            'bazhagcz',
            'melrnxrj',
            'qqqoyhqf',
            'hrfjpsrx',
            'hafnvrdg',
            'wzasinyu',
            'frbkqlzq',
            'pkpasbfh',
            'uaadlrys',
            'tjxovpar',
            'lvqxahjd',
            'ereefqow',
            'tmwalbhi',
            'eflnfinc',
            'hwmxucjt',
            'iedrvuyy',
            'mnmxdbhv',
            'qghmvftt',
            'boqbamap',
            'rjfncukp',
            'jsyshihy',
            'kwfcnspx',
            'lsvaiysm',
            'xlypkceq',
            'uvpxfarx',
            'onktnulb',
            'crycggor',
            'hzntxzxs',
            'jodwwaaj',
            'asmnoijg',
            'lkgabxtn',
            'yinohytm',
            'cymfafvu',
            'pfwnxkga',
            'fcaepans',
            'drpzqntz',
            'dmtlraxa',
            'xpuaeobo',
            'npwbdnyw',
            'prgddqif',
            'cfjaozss',
            'ynarmrcs',
            'ydkoyipv',
            'rxbjmxfy',
            'ytbnudvq',
            'rtcauesa',
            'gwvfttly',
            'xxocfbov',
            'oepykzhu',
            'siaojkqc',
            'xumasfkb',
            'mpaimhwd',
            'lutlhkrm',
            'hmlmhezr',
            'hkffbvol',
            'jhnyuwbk',
            'xfunkzni',
            'gvhtrpfw',
            'zqcfnvmn',
            'cwsftepw',
            'vfgrhquw',
            'hspqqeka',
            'khebmbyz',
            'hjinidaa',
            'ljgfvzhi',
            'bgyfruun',
            'qhruutty',
            'onanrpll',
            'qsfqisbh',
            'oyhlplyf',
            'mpnbcbjv',
            'dfjjijeg',
            'bgbrnyhl',
            'ouybnypn',
            'ciemtumh',
            'ostosnmx',
            'zxmuoqdf',
            'touhjqxz',
            'uqzlprdk',
            'twplkydd',
            'ckfkowhr',
            'esjrccyf',
            'ebidrjtd',
            'yakqyhfv',
            'kgohdxvc',
            'fmlurdki',
            'lpzvjdzi',
            'qgouskfp',
            'jyhqxfft',
            'lmngjjil',
            'diswenna',
            'awidoqvi',
            'dpgeemdk',
            'cyckbeyc',
            'ysxatowo',
            'mmjigkqq',
            'lcaaoore',
            'bbleeyyn',
            'seuzxpgr',
            'qthrjfya',
            'fnkeqtep',
            'lkykhmgv',
            'mgosqkkf',
            'otrjzklc',
            'jqmmyvsd',
            'ildfyzld',
            'eubkvrel',
            'gispnfiv',
            'hlhoeiif',
            'shruvvsc',
            'woitvqxc',
            'bmbitfft',
            'vzrdnbrq',
            'enxhxgmq',
            'mmnodgks',
            'iocqmalp',
            'yklqxeii',
            'piakutiq',
            'aszalaqn',
            'lbgkpcnt',
            'yrwdtvuv',
            'rtlvmzej',
            'fwtjkmxe',
            'xiivpktx',
            'dqsssnus',
            'kcbbesoj',
            'lsqczazm',
            'fuzgkvig',
            'izqabubp',
            'ennmupvh',
            'sjgycnfm',
            'nemdzypm',
            'kqqritkb',
            'jpfvpfex',
            'axqruijm',
            'fidctvkt',
            'nzzbxsfp',
            'uugacsof',
            'fdgdphbf',
            'wdvcnnts',
            'eqtzaieh',
            'azkgkmmv',
            'zawfrbzx',
            'xhcwzulk',
            'tjbjvefm',
            'wfxxndko',
            'ykqydswm',
            'xexihoxm',
            'iaqsolsy',
            'kjnherjw',
            'dtagrwkw',
            'eqxoamoo',
            'ztuyerzl',
            'ypdwcvjn',
            'iydqnaih',
            'ekmjoplw',
            'dbctlhav',
            'znowycbz',
            'yvigzdzr',
            'zfdfimzy',
            'chtxbdbz',
            'syqpswah',
            'xwbtnnae',
            'sgiumfoa',
            'irpzjuce',
            'rejvrhgk',
            'jgwuwcyd',
            'hpejgjsm',
            'kvtvleno',
            'mdcsgemu',
            'tombqbcl',
            'qlhwwdbn',
            'elltzqpr',
            'tmcrjpzw',
            'rdexwdvq',
            'lpvdqkpb',
            'sblwoucv',
            'enhzblxm',
            'bjuvkbvz',
            'euhyzmdx',
            'mkgflghc',
            'aabcdkwr',
            'mdiksuzc',
            'mxgjblyu',
            'quhhkxgd',
            'fgwqnkba',
            'dvlmyqxh',
            'bdgmqcue',
            'dvpsxrxu',
            'gnddfjtv',
            'vyebxsui',
            'htqhzeub',
            'gmwwjlwx',
            'ovcnnosg',
            'ubzzoplu',
            'zyutatwp',
            'fvyeceuo',
            'kjtslrdl',
            'gimazmqa',
            'azwjgikh',
            'bjmsezgf',
            'qlwydcqb',
            'slkjjyjt',
            'iermgjvf',
            'itktqmjg',
            'azaumrnj',
            'zpnkffmz',
            'otpjumye',
            'omaijeay',
            'yddmqxle'
        ];
    }
    December.addDay({
        day: 6,
        title: 'Signals and Noise',
        questions: 'What is the error-corrected version of the message being sent?',
        answer: day_6,
        input: getInput,
        example: function () {
            return [
                'eedadn',
                'drvtee',
                'eandsr',
                'raavrd',
                'atevrs',
                'tsrnev',
                'sdttsa',
                'rasrtv',
                'nssdts',
                'ntnada',
                'svetve',
                'tesnvt',
                'vntsnd',
                'vrdear',
                'dvrsen',
                'enarar'
            ];
        }
    });
}());
