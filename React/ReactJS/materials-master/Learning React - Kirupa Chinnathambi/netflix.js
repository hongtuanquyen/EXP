  <!DOCTYPE html>
<html>

<head>
    <title>Codeing Assessment</title>
    <style>
        .movies {
            color: black;
            text-align: center;
        }

        .movies[debug] {
           white-space: pre;
        }

        asset {
            width: 186px;
            height: 270px;
            background-color: grey;
            display: inline-block;
            position:relative;
            transition: all 300ms ease;
        }

        asset:after {
            content: attr(data-title);
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: rgba(0,0,0,.50);
            color: white;
            height: 64px;
            line-height: 64px;
            text-align: center;
            font-size: 14pt;
        }

        carousel{
            display: block;
        }
    </style>
</head>

<body>
    <div id='movies' class="movies">
        <carousel data-currentindex=0></carousel>  
        <carousel data-currentindex=1></carousel> 
        <carousel data-currentindex=2></carousel> 
    </div>
    <script>
        /**        
        * START HERE
        * ==========
        *
        * - Use vanilla Javascript
        * - The code below is not perfect, we expect you to improve some of it.
        * - Show in the code that you have some knowledge of ES6
        *
        * ASSIGNMENT - NETFLIX LIKE CATALOGUE
        * ===================================
        * 1. Create 3 rows. One row for every genre. ['Action', 'Crime', 'Drama']
        * 2. Create a movie poster selection indicator. (This can be a line, a border, a colored rectangle, etc. Use your imagination.)
        * 3. Add up/down keys for selection between the different rows.
        * 4. Animate the rows when the user presses up/down
        *
        * Good luck!
        */
        const data = { "id": "my_area_collections", "data": [{ "id": "movies_for_you", "title": "Movies for you", "type": "assets", "assets": [{ "id": "the_descendants", "title": "The Descendants", "url": "/asset_descendants", "genre": "Crime", "type": "1", "imdb": "7.4", "img": "https://images-na.ssl-images-amazon.com/images/M/MV5BMjEzMDAxOTUyMV5BMl5BanBnXkFtZTgwNzAxMzYzOTE@._V1_.jpgg" }, { "id": "avatar", "title": "Avatar", "url": "/series_breaking_bad", "genre": "Action", "type": "1", "imdb": "5.7", "img": "https://images-na.ssl-images-amazon.com/images/M/MV5BMjEzMDAxOTUyMV5BMl5BanBnXkFtZTgwNzAxMzYzOTE@._V1_.jpg" }, { "id": "argo", "title": "Argo", "genre": "Crime", "type": "1", "imdb": "8.7", "img": "https://images-na.ssl-images-amazon.com/images/M/MV5BMjEzMDAxOTUyMV5BMl5BanBnXkFtZTgwNzAxMzYzOTE@._V1_.jpg" }, { "id": "quantum_of_solace", "title": "Quantum of Solace", "genre": "Action", "type": "1", "imdb": "5.4", "img": "https://images-na.ssl-images-amazon.com/images/M/MV5BMjEzMDAxOTUyMV5BMl5BanBnXkFtZTgwNzAxMzYzOTE@._V1_.jpg" }, { "id": "slumdog_millionaire", "title": "Slumdog Millionaire", "genre": "Drama", "type": "1", "imdb": "7.2", "img": "https://images-na.ssl-images-amazon.com/images/M/MV5BMjEzMDAxOTUyMV5BMl5BanBnXkFtZTgwNzAxMzYzOTE@._V1_.jpg" }, { "id": "The_Kings_speech", "title": "The King's speech", "genre": "Drama", "type": "1", "imdb": "7.4", "img": "https://images-na.ssl-images-amazon.com/images/M/MV5BMjEzMDAxOTUyMV5BMl5BanBnXkFtZTgwNzAxMzYzOTE@._V1_.jpg" }, { "id": "Good_Night_and_Good_Luck", "title": "Good Night, and Good Luck.", "genre": "Drama", "type": "1", "imdb": "7.4", "img": "https://images-na.ssl-images-amazon.com/images/M/MV5BMjEzMDAxOTUyMV5BMl5BanBnXkFtZTgwNzAxMzYzOTE@._V1_.jpg" }, { "id": "Brick_Mansions", "title": "Brick Mansions", "genre": "Action", "type": "1", "imdb": "7.4", "img": "https://images-na.ssl-images-amazon.com/images/M/MV5BMjEzMDAxOTUyMV5BMl5BanBnXkFtZTgwNzAxMzYzOTE@._V1_.jpg" }, { "id": "Breaking_Bad", "title": "Breaking Bad", "genre": "Crime", "type": "1", "imdb": "7.4", "url": "/series_breaking_bad", "img": "https://images-na.ssl-images-amazon.com/images/M/MV5BMjEzMDAxOTUyMV5BMl5BanBnXkFtZTgwNzAxMzYzOTE@._V1_.jpg" }] }] };

        class Carousel {

            constructor(element, data) {
                console.log(data)
                this.element = element;
                this.data = data;
                this.data.forEach((asset) => {
                    this.element.appendChild(document.createElement('asset'));
                });
                this.alignDataset();
                this.mapToKeyboardEvents();
            }

            next() {
                this.currentIndex++;
                this.alignDataset();
            }

            previous() {
                this.currentIndex--;
                this.alignDataset();
            }

            get currentIndex() {
                return parseInt(this.element.dataset.currentindex) || 0;
            }

            set currentIndex(val) {
                if (val < 0) val = this.data.length - 1;
                else if (val >= this.data.length) val = 0;
                this.element.dataset.currentindex = val;
            }

            alignDataset() {
                [...this.element.children].forEach((assetElement, i) => {
                    const index = (i + this.currentIndex) % this.data.length;
                    assetElement.dataset.title = this.data[index].title;
                    assetElement.style.backgroundImage = `url(${this.data[index].img})`;
                });
            }

            mapToKeyboardEvents() {
            
                this.element.addEventListener('keydown', evt => {
                    
                    evt = evt || window.event;
                    switch (evt.keyCode) {
                        case 37: //Left arrow
                            this.previous();
                            break;
                        case 39: //Right arrow
                            this.next();
                            break;
                    }
                })
            }

            static get tagName() { return 'CAROUSEL' }

            static initiateOnDomElement(rootElement, data) {
                return [...rootElement.children]
                    .filter(element => element.tagName === Carousel.tagName)
                    .map((element,i) => new Carousel(element, data[i]));
            }
        }

        (function () {
            const movies = document.getElementById('movies');

            const assets = data.data.reduce((accumulator, item) => {
                accumulator.push(...item.assets);
                return accumulator;
            }, []);
            
            const movieAssets =  [assets.filter(asset => asset.genre === 'Drama'),assets.filter(asset => asset.genre === 'Action'),
            assets.filter(asset => asset.genre === 'Crime')]
          

            const carousels = Carousel.initiateOnDomElement(movies, movieAssets);

            // carousels.forEach(carousel => {
            //     Carousel.mapToKeyboardEvents(carousel, document);
            // });
        })();
    </script>
</body>

</html>
