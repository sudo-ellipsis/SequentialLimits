var aPubs, aMisc, aPrecision, aSecrets

localisationTable = { //stupidly large nested dicts of translation table
    'en':{ //ENGLISH
        'name':'Sequential Limits',
        'description':"You're the first student of the now-retired professor, and now that they've retired, you're given the mantle of chief researcher. Eager to dive into fields where your old professor left off, you start looking into the concept explored in the seventh lemma - sequential limits - to further your career.\n\nThis theory explores the concept of approximations using a rearrangement of Stirling's Formula to approximate Euler's number.\nThe formula, named after James Stirling and first stated by Abraham De Moivre, states that ln(n!) can be approximated by the infinite sum ln(1) + ln(2) .... + ln(n).\nBe careful - the closer your approximation of Euler's number is, the less your numerator grows!\nA close balancing game, fun for the whole family (or at least, the ones who play Exponential Idle). \n\nSpecial thanks to:\n\nGilles-Philippe, for development of the custom theory SDK, implementing features I requested, providing countless script examples, and help with my numerous questions and balancing.\n\nXelaroc/AlexCord, for answering my neverending questions, debugging and helping me understand how to balance a theory, and going above and beyond to teach me how custom theories work.\n\nThe Exponential Idle beta testing team\n- The Exponential Idle translation team, whose work I added to, and without which this game wouldn't have the reach it does.\n\nEnjoy!",
        'authors':'ellipsis',
        'achievements':{   
            'categories':{
                'misc':'Miscellaneous',
                'pubs':'Publications',
                'precision':'Approximation',
                'sa':'Secret Achievements'
            },
            'public':{
                //publication count achievements
                'a1':{
                    //'category':aPubs,
                    'name':'Amateur Author',
                    'description':'Publish once.'
                },
                'a2':{
                    //'category':aPubs,
                    'name':'Regular Reporter',
                    'description':'Publish 3 times.'
                },
                'a3':{
                    //'category':aPubs,
                    'name':'Studied Scribbler',
                    'description':'Publish 5 times.'
                },
                'a4':{
                    //'category':aPubs,
                    'name':'Exemplary Essayist',
                    'description':'Publish 10 times.'
                },
                'a5':{
                    //'category':aPubs,
                    'name':'Publication Professional',
                    'description':'Publish 20 times.'
                },
                //misc achievements
                'a6':{
                    //'category':aMisc,
                    'name':'Purchase Optimisation',
                    'description':'Outsource the purchasing of variables to your students.'
                },
                //precision achievements
                'a7':{
                    //'category':aPrecision,
                    'name':"Close Enough",
                    'description': "Get your approximation of e to 10^-1 off true."
                },
                'a8':{
                    //'category':aPrecision,
                    'name':"Nitpicking Excercise",
                    'description': "Get your approximation of e to 10^-5 off true."
                },
                'a9':{
                    //'category':aPrecision,
                    'name':"Splitting Hairs",
                    'description': "Get your approximation of e to 10^-10 off true."
                },
                'a10':{
                    //'category':aPrecision,
                    'name':"Microscopic",
                    'description': "Get your approximation of e to 10^-15 off true."
                },
                'a11':{
                    //'category':aPrecision,
                    'name':"Are we there yet?",
                    'description': "Get your approximation of e to 10^-50 off true."
                },  
                'a12':{
                    //'category':aPrecision,
                    'name':"Subatomic",
                    'description': "Get your approximation of e to 10^-25 off true."
                },
                'a13':{
                    //'category':aPrecision,
                    'name':"Planck Pettiness",
                    'description': "Get your approximation of e to 10^-35 off true."
                },
                'a14':{
                    //'category':aPrecision,
                    'name':"Precision Player",
                    'description': "Get your approximation of e to 10^-100 off true."
                },
                'a15':{
                    //'category':aPrecision,
                    'name':"Running Out Of Room",
                    'description': "Get your approximation of e to 10^-250 off true."
                },
                'a16':{
                    //'category':aPrecision,
                    'name':"You Can Stop Anytime",
                    'description': "Get your approximation of e to 10^-500 off true."
                },

            },
            'secret':{
                'sa1':{
                    //'category':aSecrets,
                    'name':'Pattern Fanatic',
                    'description':'Have every variable level the same.',
                    'hint':'Palindromic'
                },
                'sa2':{
                    //'category':aSecrets,
                    'name':'l33t5p34k',
                    'description':'1337.',
                    'hint':'Elite.'
                },
                'sa3':{
                    //'category':aSecrets,
                    'name':'On Vacation',
                    'description':'Don\'t buy anything for an hour after publication.',
                    'hint':'Forgot Something?'
                },
                'sa4':{
                    //'category':aSecrets,
                    'name':'Futility',
                    'description':'Tap the equation 1000 times.',
                    'hint':'Fatigued'
                },
            }
        },
        'story':{
            'chapter1':{
                'title':'A New Beginning',
                'body':"You return from your old professor's retirement party, the mantle passed onto you, the first student, to head the department of students accrued over the years.\nExcited to finally be listed as something other than 'et. al' on a paper, you continued with your existing research, but as progress slowed, you felt less and less satisfied.\nThe days turn into weeks, which blur together as more and more publications are written.\nEventually, a student comes to you with a dusty tome, featuring a as-of-yet unexplored theorem.\nFeeling a stroke of inspiriation, you assemble a team of students and throw yourself into the research."
                },
            
            'chapter2':{
                'title':'Taking Risks',
                'body':"You notice a few unassuming variables at the bottom of the equation.\nA student warns you against changing them, citing the risk of decreasing the income existing values, but you forge ahead.",
            },
            'chapter3':{
                'title':'International Recognition',
                'body':"You publish your first paper, with your name front and center.\nColleagues congratulate you, but you feel there is something missing, further exploration to be had.\nYou decide to keep going full steam ahead.",
            },
            'chapter4':{
                'title':'Light Modification',
                'body':"With your progress starting to slow, you scour the original equation texts to find a remedy.\nIt turns out all along there's been some modifiers you can add, but at ever increasing costs.\nYou decide to buy one, hoping it alleviates your issues...",
            },
            'chapter5':{
                'title':'Making Progress',
                'body':"You reach 1e100 ρ₁, a major milestone in your research.\nColleagues come to congratulate you on pushing your research so far, but you shrug them off - you feel as if there's more you could do.\nYou head back to your office and get to work once more.",
            },
            'chapter6':{
                'title':'The End... Or Is It?',
                'body':"You finally purchased every modifier, to close out your research into this field.\nYour students assigned to this project celebrate, anticipating closing out this line of research, and your name is posted in journals worldwide.\n\nYou decide to go over your numbers once more, just to make sure...",
            },
            'chapter7':{
                'title':'Mathaholic',
                'body':"1e500.\n\nA monumentally large number, but barely a blip to you now.\nPeople are starting to take notice as you push mathematics to points thought unachieveable in this field.\nThere's a waiting list to study under you now.\nYour friends and family are expressing concern, worried you're in too deep.\nIt doesn't matter.\nAnother breakthrough is close.\nYou can feel it.\n\n\nRight?",
            },
            'chapter8':{
                'title':'The End',
                'body':"1e1000.\n\nA number so big it'd be impossible to comprehend.\nYou did it. They said you couldn't.\nYears after you first started, you reach an incredible end to your research.\nYou're featured on TIME, on daytime television, in worldwide newspapers.\nYour papers are framed, your students all professors in their own rights now.\nYou pass on the mantle to a younger student of yours to retire like your old professor, back all those years ago.\n\nTHE END.\nThanks for playing! - ellipsis",
            },
            'chapter9':{//todo
                'title':'',
                'body':''
            },
            'chapter10':{//todo
                'title':'',
                'body':''
            }
        }
    },
    'ru':{ //RUSSIAN
        //thank you to Gyl9Sh for the translation!
        'name':'Последовательные пределы',
        'description':"\nВы первый ученик ныне ушедшего профессора, и теперь, когда он вышл на пенсию, вам дали звание главного научного сотрудника. Стремясь погрузиться в области, в которых\nизучал ваш старый профессор, вы начинаете изучать концепцию, изложенную в седьмой лемме — последовательные пределы — для продвижения своей карьеры.\nЭта теория исследует концепцию аппроксимаций, используя преобразование формулы Стирлинга для аппроксимации числа Эйлера.\nФормула, названная в честь Джеймса Стерлинга и впервые сформулированная Абрахамом Де Муавром, утверждает, что ln(n!) можно аппроксимировать бесконечной суммой ln(1) + ln(2) .... + ln(n).\nБудьте осторожны - чем ближе ваше приближение к числу Эйлера, тем меньше растет ваш числитель!\nИгра с близким балансом, развлечение для всей семьи (или, по крайней мере, для тех, кто играет в Exponential Idle).\nОтдельное спасибо:\nGilles-Philippe за разработку SDK пользовательской теории, реализацию запрошенных мною функций, предоставление бесчисленных примеров скриптов и помощь в моих многочисленных вопросах и балансировке.\nXelaroc/AlexCord, за ответы на мои бесконечные вопросы, отладку и помощь в понимании того, как сбалансировать теорию, а также за то, что сделали все возможное, чтобы\nнаучить меня, как работают пользовательские теории.\nКоманда бета-тестирования Exponential Idle\n- Команда переводчиков Exponential Idle, к работе которой я присоединился, и без которых эта игра не имела бы того охвата, который она имеет.\n\nНаслаждаться!\nПереведено Gyl9Sh",
        'authors':'ellipsis',
        'achievements':{   
            'categories':{
                'misc':'Разнообразный',
                'pubs':'Публикации',
                'precision':'Точность аппроксимации',
                'sa':'Секретные достижения'
            },
            'public':{
                //publication count achievements
                'a1':{
                    //'category':aPubs,
                    'name':'Автор-любитель',
                    'description':'Опубликовать один раз.'
                },
                'a2':{
                    //'category':aPubs,
                    'name':'Обычный репортер',
                    'description':'Опубликовать 3 раза.'
                },
                'a3':{
                    //'category':aPubs,
                    'name':'Писака ученик',
                    'description':'Опубликовать 5 раз.'
                },
                'a4':{
                    //'category':aPubs,
                    'name':'Образцовый эссеист',
                    'description':'Опубликовать 10 раз.'
                },
                'a5':{
                    //'category':aPubs,
                    'name':'Профессиональный публикатор',
                    'description':'Опубликовать 20 раз.'
                },
                //misc achievements
                'a6':{
                    //'category':aMisc,
                    'name':'Оптимизация покупки',
                    'description':'Поручите закупку переменных своим ученикам.'
                },
                //precision achievements
                'a7':{
                    //'category':aPrecision,
                    'name':"Достаточно близко",
                    'description': "Получите ваше приближение e к 10^-1."
                },
                'a8':{
                    //'category':aPrecision,
                    'name':"Упражнение на придирки",
                    'description': "Получите приближение e к 10^-5."
                },
                'a9':{
                    //'category':aPrecision,
                    'name':"Разделение волос",
                    'description': "Получите приближение e к 10^-10."
                },
                'a10':{
                    //'category':aPrecision,
                    'name':"Микроскопический",
                    'description': "Получите приближение e к 10^-15."
                },
                'a11':{
                    //'category':aPrecision,
                    'name':"Мы уже на месте?",
                    'description': "Получите приближение e к 10^-50."
                },  
                'a12':{
                    //'category':aPrecision,
                    'name':"Субатомный",
                    'description': "Получите приближение e к 10^-25."
                },
                'a13':{
                    //'category':aPrecision,
                    'name':"Мелкая планка",
                    'description': "Получите приближение e к 10^-35."
                },
                'a14':{
                    //'category':aPrecision,
                    'name':"Точный игрок",
                    'description': "Получите приближение e к 10^-100."
                },
                'a15':{
                    //'category':aPrecision,
                    'name':"Недостаточно места",
                    'description': "Получите приближение e к 10^-250."
                },
                'a16':{
                    //'category':aPrecision,
                    'name':"Вы можете остановиться в любое время",
                    'description': "Получите приближение e к 10^-500"
                },

            },
            'secret':{
                'sa1':{
                    //'category':aSecrets,
                    'name':'Фанатик узоров',
                    'description':'Получите одинаковый уровень всех переменных.',
                    'hint':'Палиндромный.'
                },
                'sa2':{
                    //'category':aSecrets,
                    'name':'l33t5p34k',
                    'description':'1337.',
                    'hint':'Элита'
                },
                'sa3':{
                    //'category':aSecrets,
                    'name':'В отпуске',
                    'description':'Не покупайте ничего в течение часа после публикации.',
                    'hint':'Забыл что-то?'
                },
                'sa4':{
                    //'category':aSecrets,
                    'name':'Бесполезность',
                    'description':'Нажмите на уравнение 1000 раз.',
                    'hint':'Усталый.'
                },
            }
        },
        'story':{
            'chapter1':{
                'title':'Новое начало',
                'body':"\nВы возвращаетесь с вечеринки по случаю выхода на пенсию вашего старого профессора, мантия перешла к вам, первому студенту, чтобы возглавить кафедру студентов, накопленную за эти годы.\nРад, что наконец-то был указан как нечто иное, чем \"и другие\", вы продолжали свои текущие исследования, но по мере того, как прогресс замедлялся, вы чувствовали себя все менее и менее удовлетворенными.\nДни превращаются в недели, которые сливаются воедино по мере того, как пишется все больше и больше публикаций.\nВ конце концов к вам приходит студент с пыльным фолиантом, в котором содержится еще не изученная теорема.\nЧувствуя прилив вдохновения, вы собираете команду студентов и с головой уходите в исследование."
                },
            
            'chapter2':{
                'title':'Рисковать',
                'body':"Вы замечаете несколько несущественных переменных в нижней части уравнения.\nСтудент предостерегает вас от их изменения, ссылаясь на риск уменьшения дохода существующих значений, но вы идете вперед.",
            },
            'chapter3':{
                'title':'Международное признание',
                'body':"Вы публикуете свою первую статью с вашим именем спереди и по центру.\nКоллеги поздравляют вас, но вы чувствуете, что чего-то не хватает, нужно доработать.\nВы решаете идти полным ходом вперед."
            },
            'chapter4':{
                'title':'Легкая модификация',
                'body':"Когда ваш прогресс начинает замедляться, вы просматриваете исходные тексты уравнений, чтобы найти средство.\nОказывается, все это время вы могли добавлять некоторые модификаторы, но с постоянно растущими затратами.\nВы решаете купить его, надеясь, что это облегчит ваши проблемы..."
            },
            'chapter5':{
                'title':'Продвижение',
                'body':"Вы достигаете 1e100 ρ₁, что является важной вехой в ваших исследованиях.\nКоллеги приходят, чтобы поздравить вас с продвижением вашего исследования, но вы отмахиваетесь от них — вам кажется, что вы могли бы сделать больше.\nВы возвращаетесь в свой офис и снова принимаетесь за работу."
            },
            'chapter6':{
                'title':'Конец ... или нет?',
                'body':"Вы, наконец, купили все модификаторы, чтобы завершить свои исследования в этой области.\nВаши студенты, назначенные для этого проекта, празднуют завершение этого направления исследований, и ваше имя публикуется в журналах по всему миру.\nВы решаете еще раз проверить свои цифры, просто чтобы убедиться...",
            },
            'chapter7':{
                'title':'Матеголик',
                'body':"1e500.\nМонументально большое число, но сейчас для вас оно едва заметно.\nЛюди начинают замечать, как вы подталкиваете математику к моментам, которые считались недостижимыми в этой области.\nСейчас у вас очередь на обучение.\nВаши друзья и семья беспокоятся, что вы слишком глубоко увязли.\nЭто не имеет значения.\nЕще один прорыв близок.\nВы чувствуете это.\nВерно?"
            },
            'chapter8':{
                'title':'Конец',
                'body':"1e1000.\n\nЧисло такое большое, что его невозможно понять.\nТы сделал это. Они сказали, что у Вас не получится.\nСпустя годы после того, как вы впервые начали, вы достигаете невероятного конца своего исследования.\nО вас пишут в TIME, на дневном телевидении, в мировых газетах.\nВаши документы оформлены, твои студенты теперь все профессора со своими правами.\nВы передаете мантию своему младшему студенту, чтобы уйти на пенсию, как и ваш старый профессор много лет назад.\nКОНЕЦ.\nСпасибо за игру! ..."},
            'chapter9':{//todo
                'title':'',
                'body':''
            },
            'chapter10':{//todo
                'title':'',
                'body':''
            }
        }
    },
}

//
//TEST CODE
// //
// if (localisationTable['en']) {
//     console.log('snorg')
// }
// console.log(Object.keys(localisationTable))

// var bsf={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'\=",e:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=bsf._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},d:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=bsf._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}};
    
// var  locale =  localisationTable.en 
//test expressions
// console.log(locale().achievements.public.a1.category);
// console.log('en' in localisationTable);

// console.log(bsf.d("RnV0aWxpdHk") + ',' + bsf.d("RG9uJ3QgYnV5IGFueXRoaW5nIGZvciBhbiBob3VyIGFmdGVyIGEgcHVibGljYXRpb24") + ',' + bsf.d("RWxpdGU"));




// if (Localization.getLanguage in localisationTable.keys()){ //if it's in the localisation table
//     locale = localisationTable.Localization.getLanguage;
// }
// else locale = localisationTable.en;

// var language = () => { //this is so fucking buggy. requires 100% translation. perhaps a method that allows partial translation?
//     if (Localization.getLanguage in localisationTable.keys()){ //if it's in the localisation table
//         return localisationTable.Localization.getLanguage
//     }
//     else return localisationTable.en
// }

//CHEAT SHEET
// English               en
// Arabic                ar
// Chinese (Simplified)  zh-Hans
// Chinese (Traditional) zh-Hant
// Czech                 cs
// German                de
// Spanish               es
// Farsi                 fa
// French                fr
// Hebrew                he
// Indonesian            id
// Italian               it
// Japanese              ja
// Korean                ko
// Latvian               lv
// Hungarian             hu
// Dutch                 nl
// Norwegian             no
// Polish                pl
// Portuguese (Brazil)   pt-br
// Portuguese (Portugal) pt
// Russian               ru
// Ukrainian             uk
// Slovak                sk
// Finnish               fi
// Vietnamese            vi