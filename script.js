const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const disk = $('.play-disk');
const playlist = $('.playlist');
const headingSong = $('.play-title h1');
const headingSinger = $('.play-singer');
const diskImage = $('.play-disk img');
const audio = $('#audio');
const play = $('.btn-play');
const progress = $('.play-progress')
var isDrag = false;
var isDragforUpdateTime = false; // Để chỉnh đúng thời gian lại ban đầu khi tua qua bài mới
var diskRotateAnimation ;
let isLoaded =  false;
var songs = document.querySelectorAll('.song')

const app = {
    currentIndex : 0,
    isPlaying : false,
    isRepeat : false,
    isShuffe : false,
    songs: [
        {
            name: 'Until I found you',
            singer: 'Stephen Sanchez',
            path: './assets/music/untilifoundyou.mp3',
            image: './assets/img/untilifoundyou.jpg'     
        },
        {
            name: 'Đi về nhà',
            singer: 'Đen Vâu & JustaTee',
            path: './assets/music/divenha.mp3',
            image: './assets/img/divenha.jpg'
        },
    
        // {
        //     name: 'exile',
        //     singer: 'Taylor Swift',
        //     path: './assets/music/folklore.mp3',
        //     image: './assets/img/folklore.jpg'
        // },
        {
            name: 'Head in the clouds',
            singer: 'Hayd',
            path: './assets/music/headinclouds.mp3',
            image: './assets/img/headinclouds.jpg'
        },
        // {
        //     name: 'DDU-DU DDU-DU',
        //     singer: 'BLACKPINK',
        //     path: './assets/music/dududu.mp3',
        //     image: './assets/img/dududu.jpg'
        // },
        {
            name: 'Mặt mộc',
            singer: ' Phạm Nguyên Ngọc, VAnh',
            path: './assets/music/matmoc.mp3',
            image: './assets/img/matmoc.jpg'
        },
        {
            name: 'You & Me',
            singer: 'JENNIE',
            path: './assets/music/youandme.mp3',
            image: './assets/img/youandme.jpg'
        },
        // {
        //     name: 'I can see you',
        //     singer: 'Taylor Swift',
        //     path: './assets/music/icanseeyou.mp3',
        //     image: './assets/img/icanseeyou.jpg'
        // },
        {
            name: 'Ánh sao và bầu trời',
            singer: 'T.R.I & Cá',
            path: './assets/music/anhsaovabautroi.mp3',
            image: './assets/img/anhsaovabautroi.jpg'
        },
        // {
        //     name: 'London boy',
        //     singer: 'Taylor Swift',
        //     path: './assets/music/londonboy.mp3',
        //     image: './assets/img/londonboy.jpg'
        // },
        {
            name: 'Muộn rồi mà sao còn',
            singer: 'Sơn Tùng MTP',
            path: './assets/music/muonroimasaocon.mp3',
            image: './assets/img/muonroimasaocon.jpg'
        },
        {
            name: 'THE GIRLS',
            singer: 'BLACKPINK',
            path: './assets/music/thegirls.mp3',
            image: './assets/img/thegirls.jpg'      
        },
    
        {
            name: 'Có em đời bỗng vui',
            singer: 'Chillies',
            path: './assets/music/coemdoibongvui.mp3',
            image: './assets/img/coemdoibongvui.jpg'     
        },
        // {
        //     name: 'Tally',
        //     singer: 'BLACKPINK',
        //     path: './assets/music/tally.mp3',
        //     image: './assets/img/tally.jpeg'     
        // },
    
          
    
    ],
    render: function(){
        const html = '';
        let index = 0;
        const song =  this.songs.map(function(song){
         
             return `
             <div data-index="${index++}" class="song"  >
                 <div class="thumb">
                     <img src="${song.image}" alt="">
                 </div>
                 <div class="song-info">
                     <h1 class="song-title">${song.name}</h1>
                     <p class="song-singer">${song.singer}</p>
                 </div>
                 <div class="option">
                     <i class="fa-solid fa-ellipsis"></i>
                 </div>
                 
             </div>
             `
    }
    
    )

        
        playlist.innerHTML = song.join('');
 
},
    defineProperties :  function(){
        Object.defineProperty(this, 'currentSong', {
            get: function(){
                return this.songs[this.currentIndex];
            }
        })
    },
    loadCurrentSong : function(){
     
        headingSong.innerText = this.currentSong.name;
        headingSinger.innerText = this.currentSong.singer;
        diskImage.src = this.currentSong.image;
        audio.src = this.currentSong.path;
        $( `[data-index="${app.currentIndex}"]`).classList.add('playing');


        audio.oncanplaythrough  = function()
        {    
            app.handldeTimeUpdate();

            // Khi bài hát đang không chạy mà tua thì isDragforUpdateTime là false
          
                // Thời gian sẽ cập nhật lại

            
        }
       
        

    },
  
 handlerEvents : function(){
  
        // Xử lý quay đia nhạc

        const keyFrames = {
            transform:  'rotate(360deg)',
        }

        const timmings = {
            duration: 10000,
            iterations: Infinity
        }

         diskRotateAnimation =  disk.animate(keyFrames,timmings);

         diskRotateAnimation.pause();


        // Xử lý phóng to thu nhỏ đĩa
        const diskWidth = disk.offsetWidth;
        document.onscroll = function(){
        const scrollY = window.scrollY;
        const newWidth = diskWidth - scrollY;
        disk.style.width = newWidth  > 0  ? newWidth + 'px': 0 ;
        disk.style.opacity =  newWidth / diskWidth;
        }

        // Xử lý play nhạc
        this.playMusic();
        playlist.onmousedown  = function(e)
        {
          
           e.target.classList.add('active')
           setTimeout(()=>{
            e.target.classList.remove('active')

           },1000)
        
        
    }
    playlist.onmouseup  = function(e)
    {   
       // remove zome in out button to nhỏ
       


        if(e.target.closest('.song'))
        {
            
        audio.currentTime = 0;
        progress.value = 0;
        e.target.classList.remove('active') 
        $( `[data-index="${app.currentIndex}"]`).classList.remove('playing');
            app.currentIndex = Number(e.target.closest('.song').dataset.index);
            app.loadCurrentSong();
            audio.onplay = function(){
                app.isPlaying = true;
                $('.btn-play').classList.add('active');
                diskRotateAnimation.play();
            }
            e.target.classList.add('playing')
    
        
            
            // Note : if sẽ chạy trước vì audio.onplay và onpause làm hàm bất đồng bộ gắn liền với audio,
            // khi audio có nhạc thì hàm mới chạy
          
                
                audio.play();
                console.log('play')

        }
      
        
        
        

}
    },
    playMusic :  function(){

        // Xử lý khi play / pause nhạc
        const _this =  this;
        play.onclick =  function(){
  
           
// ban dau isplaying = false
            audio.onplay = function(){
                _this.isPlaying = true;
                $('.btn-play').classList.add('active');
                
                diskRotateAnimation.play();
            }

            audio.onpause = function(){
                _this.isPlaying = false;
                $('.btn-play').classList.remove('active');
                diskRotateAnimation.pause();

                // $('.pause-btn').classList.add('active');
                // $('.play-btn').classList.remove('active');

            }

            
            // Note : if sẽ chạy trước vì audio.onplay và onpause làm hàm bất đồng bộ gắn liền với audio,
            // khi audio có nhạc thì hàm mới chạy
            if(_this.isPlaying){
                audio.pause();
              
               
            }
            else{
                
                audio.play();
            
            }

        }

        //  Xử lý khi tiến độ bài hát thay đổi
         /** Duration ban đầu sẽ là NaN vì chưa kịp tải xong bài hát */
        
        
         audio.ontimeupdate = function(){
            
            if(audio.duration){
                  
               if(!isDrag){
                progress.value = Math.floor((audio.currentTime / audio.duration)*100);
                app.handldeTimeUpdate();
                if(audio.currentTime==audio.duration)
                {
                 
                    audio.onpause = function(){
                        // Tô đỏ đối tượng đang phát
                        $( `[data-index="${app.currentIndex}"]`).classList.remove('playing');
                   app.handleRepeatAndShuffe();
        
                    
                  }
            
                }
                
               }

             

          // Xử lý số giây hiển thị
           
          
                
            }
     
         }

      
         // Xử lý khi tua

         progress.oninput =  function(){
          
            isDrag = true;
            const cur =  (progress.value*audio.duration)/100;
            const minDur = Math.floor(audio.duration/60);
            const secDur = Math.floor(audio.duration%60);
            const minCur = Math.floor(cur/60);
            const secCur = Math.floor(cur%60);

            $('.min-dur').innerText = minCur;
            $('.sec-dur').innerText = secCur < 10 ? '0' + secCur : secCur;
            const secleft = secDur - secCur;
            const minLeft = minDur - minCur;
            if(secleft<10 )
        {
            if(secleft<0)
            {
                
                $('.sec-left').innerText =  (60 + secleft) < 10 ? ('0' + (60 + secleft)) : (60 + secleft);
                $('.min-left').innerText = '-' + (minLeft-1);

            }
            else{
                $('.min-left').innerText = '-' + minLeft;
                $('.sec-left').innerText = '0' + secleft;
            }
        }
        else{
            $('.min-left').innerText = '-' + minLeft;

            $('.sec-left').innerText =  secleft;

        }
     
         }

         progress.onmouseup = function(){
            isDrag = false;
            isDragforUpdateTime = true;

         }

         progress.onchange = function(e){
           var seekTime = (e.target.value*audio.duration)/100;
          

    
        audio.currentTime = seekTime;
                  if(seekTime==audio.duration)
          {
            seekTime = 0;
            audio.onpause = function(){
                
                app.currentIndex +=1 
             if(app.currentIndex==app.songs.length)
              {
             app.currentIndex = 0;
               }   
                app.loadCurrentSong();

                audio.play();

            }
          }
         
         }


    }
,

    handldeTimeUpdate : function(){

 
        const minDur = Math.floor(audio.duration/60);
        const secDur = Math.floor(audio.duration%60);
        const minCur = Math.floor(audio.currentTime/60);
        const secCur = Math.floor(audio.currentTime%60);

        $('.min-dur').innerText = minCur;
        $('.sec-dur').innerText = secCur < 10 ? '0' + secCur : secCur;
        const secleft = secDur - secCur;
        const minLeft = minDur - minCur;
      
        if(secleft<10 )
        {
            if(secleft<0)
            {
                
                $('.sec-left').innerText =  (60 + secleft) < 10 ? ('0' + (60 + secleft)) : (60 + secleft);
                $('.min-left').innerText = '-' + (minLeft-1);

            }
            else{
                $('.min-left').innerText = '-' + minLeft;
                $('.sec-left').innerText = '0' + secleft;
            }
        }
        else{
            $('.min-left').innerText = '-' + minLeft;

            $('.sec-left').innerText =  secleft;

        }
       
    
  
        
   
    },
    handleRepeatAndShuffe : function(){
             // Không repeat
             if(!app.isRepeat) // ban dau la false 
             { 
               if(!app.isShuffe) // Không suffe
               {
                    // Không repeat thì chạy tiếp
                   app.currentIndex +=1 
                   if(app.currentIndex==app.songs.length)
                    {
                   app.currentIndex = 0;
                     }   
                      app.loadCurrentSong();
      
                      audio.play();
               }
               else{
                   app.currentIndex = Math.floor(Math.random() * (app.songs.length));
                   app.loadCurrentSong();
      
                   audio.play();
               }
              
         
             }
             else{
                $( `[data-index="${app.currentIndex}"]`).classList.add('playing');
                   audio.play();
             
             

             }
    },
    reSmaller : function(){
  
    }
    ,
    handleSuffle : function(){
        $('.fa-shuffle').classList.toggle('active');
        if(!this.isShuffe)
        {
            this.isShuffe = true;
        }
        else{
            this.isShuffe = false;
        }
        
    },
    handleRepeat : function(){
        $('.fa-reply').classList.toggle('active');
        if(!this.isRepeat)
        {
            this.isRepeat = true;
        }
        else{
            this.isRepeat = false;
        }
        
       
    },
    handleForward : function(){
        $( `[data-index="${app.currentIndex}"]`).classList.remove('playing');
        $('.btn-forward').classList.toggle('active');
        setTimeout(() => {
            $('.btn-forward').classList.toggle('active');
          }, 200);
          if(!app.isRepeat) // ban dau la false // Không repeat
          { 
            if(!app.isShuffe) // Không suffe
            {
                 // Không shuffle thì chạy như bình thường (nút tua bình thường)
                 this.currentIndex +=1;
           
                 if(this.currentIndex==(this.songs.length))
                 {
                     this.currentIndex = 0;
                 }
                if(this.isPlaying)
                {
                 progress.value = 0; 
                audio.currentTime = 0;
                 this.loadCurrentSong();
            
                 audio.play();
         
                }
                else{
          
                 progress.value = 0; 
                 this.loadCurrentSong();

                
                 }
            }
            else{
                // Có shuffe thì random (không repeat)
                let temp = Math.floor(Math.random() * (app.songs.length));
                while(app.currentIndex == temp)
               {
                temp = Math.floor(Math.random() * (app.songs.length));
               }
                 app.currentIndex = temp;
   
                if(this.isPlaying)
                {
                 progress.value = 0; 
                audio.currentTime = 0;
                 this.loadCurrentSong();
            
                 audio.play();
         
                }
                else{
          
                 progress.value = 0; 
                 this.loadCurrentSong();
                
                 }
            }
           
      
          }
          else{
            // Có repeat (không shuffe)
          
                audio.currentTime = 0;
                progress.value = 0; 
                if(!app.isPlaying)// nhac khong chay
                {
                    this.loadCurrentSong();
                }
                else{
                    this.loadCurrentSong();
                    audio.play();
                }
           
             
             

             
          
          

          }
      
        
        },
        handleBackward : function(){

            $( `[data-index="${app.currentIndex}"]`).classList.remove('playing');
            $('.btn-backward').classList.toggle('active');
            setTimeout(() => {
                $('.btn-backward').classList.toggle('active');
              }, 200);
                        // Không repeat
             if(!app.isRepeat) // ban dau la false 
             { 
               if(!app.isShuffe) // Không suffe
               {
                    // Không shuffle thì chạy tiếp
                    this.currentIndex -=1;
              
                    if(this.currentIndex<0)
                    {
                        this.currentIndex = this.songs.length - 1;
                    }
                   if(this.isPlaying)
                   {
                    progress.value = 0; 
            
                    this.loadCurrentSong();
               
                    audio.play();
            
                   }
                   else{
             
                    progress.value = 0; 
                    this.loadCurrentSong();
                   
                    }
               }
               else{
                 let temp = Math.floor(Math.random() * (app.songs.length));
                    while(app.currentIndex == temp)
                   {
                    temp = Math.floor(Math.random() * (app.songs.length));
                   }
                     app.currentIndex = temp;
                   
                
      
                   if(this.isPlaying)
                   {
                    progress.value = 0; 
                    audio.currentTime = 0;
                    this.loadCurrentSong();
               
                    audio.play();
            
                   }
                   else{
             
                    progress.value = 0; 
                    this.loadCurrentSong();
                   
                    }
               }
              
         
             }
             else{
                audio.currentTime = 0;
                progress.value = 0; 
                if(!app.isPlaying)// nhac khong chay
                {
                    this.loadCurrentSong();
                }
                else{
                    this.loadCurrentSong();
                    audio.play();
                }
           
             
             

             }
      
            
            },


    start : function(){
        this.defineProperties();
        this.render();
        this.loadCurrentSong();
        this.handlerEvents();
     



        
    
}
}

app.start();

$('.fa-moon').onclick = function(){
    $('.fa-moon').classList.add('active');
    $('.fa-sun').classList.add('active');
    $('.fa-sun').classList.remove('up');
    $('.fa-moon').classList.remove('up');
    $('.play-zone').classList.add('active');
    $('.playlist').classList.add('active');
    document.querySelector('html').style.background = 'url(./assets/img/nitg.jpg)  no-repeat';
    document.querySelector('html').style.backgroundSize = 'cover';
    document.querySelector('html').style.backgroundPosition = 'center center';


}

$('.fa-sun').onclick = function(){


    $('.fa-sun').classList.remove('active');
    $('.fa-sun').classList.add('up');
    $('.fa-moon').classList.remove('active');
    $('.fa-moon').classList.add('up');
    $('.play-zone').classList.remove('active');
    $('.playlist').classList.remove('active');
    document.querySelector('html').style.background = 'url(./assets/img/background.jpg)  no-repeat';
    document.querySelector('html').style.backgroundSize = 'cover';
    document.querySelector('html').style.backgroundPosition = 'center center';
    document.querySelector('html').style.height = 1300 + 'px';
 


}
