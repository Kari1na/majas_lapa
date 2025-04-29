
    const myGame = document.getElementById("myGame");
    const ctx = myGame.getContext("2d");

        let girl_x = 0;               
        let girl_y = 0;
        const girlWidth = 65;      
      const girlHeight = 65;//defineti mainigie

        let bracelet_x = 0;
        let bracelet_y = 0;
        const braceletWidth = 45;
        const braceletHeight = 45;

        let punktuSkaits = 0;//skaitam no nulles
        // izveido mainīgo, laika skaitīšanai
        let taimeris = 40;//taimeris
        let apturSpeli;//spele tiek aptureta

        const girlAtt = new Image();
        girlAtt.src = "https://png.pngtree.com/png-clipart/20240428/original/pngtree-beautiful-cute-cartoon-girl-on-transparent-png-image_14965046.png";

        const braceletAtt = new Image();
        braceletAtt.src = "https://png.pngtree.com/png-clipart/20220812/ourmid/pngtree-black-bracelet-png-image_6107660.png";

        // izveido funkciju divu zīmējumu saskarei, divi attēlu mainīgie ar x un y
        function atteluSaskare(x1, y1, girlWidth, girlHeight, x2, y2, braceletWidth, braceletHeight) {
            // pārāk tālu uz sāniem viens objekts no otra
            if (x1 >= x2 + braceletWidth || x1 + girlWidth <= x2) return false;
            // pārāk zemu vai augstu viens objekts no otra, nesaskaras 
            if (y1 >= y2 + braceletHeight || y1 + girlHeight <= y2) return false;
            //   ja neizpildās iepriekšminētie nosacījumi nav patiesi,tad
            return true;
        }

        function MyKeyDownHandler(MyEvent) {
            if (MyEvent.keyCode == 37 && girl_x > 0) {
                girl_x = girl_x - 10;
            }
            if (MyEvent.keyCode == 39 && girl_x + girlWidth < myGame.width) {//lai neiziet ara no laukuma
                girl_x = girl_x + 10;
            }
        }

        addEventListener("keydown", MyKeyDownHandler);

        function Laukums() {
            // notīra zīmēšanas laukumu
            ctx.clearRect(0, 0, myGame.width, myGame.height);
            // tūlīt pēc canvas notīrīšanas ievieto score uzrakstu ar stilu
            ctx.fillStyle = "PaleVioletRed";
            ctx.font = "18px Arial";
            ctx.fillText("Punktu skaits: " + punktuSkaits, 0, 25);
            // ievieto taimera uzrakstu ar tādu pašu stilu kā punktu skaita uzrakstu tikai citām y koordinātām, izmantojot metodi, kas palīdzēs mainīt laiku.

            ctx.fillText("Laiks: " + Math.round(taimeris), 0, 45);
            // uzraksts, kas parādīsies, kad laiks būs beidzies
            if (taimeris <= 0) {
                ctx.fillStyle = "LightCoral";
                ctx.font = "bold 40px Arial";
                ctx.textAlign = "center";
                ctx.fillText("GAME OVER", myGame.width / 2, myGame.height / 2);
                ctx.textAlign = "left";
                // aptur spēli
                clearInterval(apturSpeli);
                return;
            }

            taimeris -= 1 / 40;

            girl_y = myGame.height - girlHeight;

            ctx.drawImage(girlAtt, girl_x, girl_y, girlWidth, girlHeight);

            bracelet_y = bracelet_y + 1;
            if (bracelet_y > myGame.height) {
                bracelet_y = 0;

                bracelet_x = Math.random() * (myGame.width - braceletWidth);
            }
            ctx.drawImage(braceletAtt, bracelet_x, bracelet_y, braceletWidth, braceletHeight);

            // attēlu sadursmes pārbaude
            if (atteluSaskare(girl_x, girl_y, girlWidth, girlHeight, bracelet_x, bracelet_y, braceletWidth, braceletHeight)) {
                punktuSkaits++;
                bracelet_x = -braceletWidth;
                bracelet_y = 0;
            }
 }
        apturSpeli = setInterval(Laukums, 25);

    
