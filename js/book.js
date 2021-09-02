
document.getElementById('error-message').style.display = 'none';
document.getElementById('spinner').style.display = 'none';
//
const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear data
    searchField.value = '';

    // Handle empty search request
    if (searchText === '') {
        // error display
        displayError();
    }
    else {
        // Display Spinner
        document.getElementById('spinner').style.display = 'block';
        // Hide error
        document.getElementById('error-message').style.display = 'none';
        // Clear book Details
        document.getElementById('book-details').textContent = '';
        // Clear Search Result
        document.getElementById('search-result').textContent ='';
        // load data book
        const url = `http://openlibrary.org/search.json?q=${searchText}`;
        // console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data));
    }
};

const displayError = () => {
    document.getElementById('error-message').style.display = 'block';
    document.getElementById('spinner').style.display = 'none';
    document.getElementById('book-numbers').textContent = '';

};
// Display Search Result
const displaySearchResult = books => {
    // console.log(books);
    document.getElementById('book-numbers').textContent = '';
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    const teamList = books.docs;
    // console.log(teamList);
    //error display show/  Display Search Result
    if (teamList == null) {
        displayError();
    }
    else{

        document.getElementById('error-message').style.display = 'none';
        document.getElementById('spinner').style.display = 'none';
        document.getElementById('book-numbers').innerText = `Books Found: ${teamList.length ? teamList.length:'Not Found Book ! Valid Name, Try Again' }`;

        // Retrieve each book display in a card
        teamList.forEach(book => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div  class="card h-100 text-center">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i:"N/A"}-M.jpg" class="w-75 h-75 mx-auto" alt="...">
                
                
                    <div class="card-header">
                        <h5 class="card-title">Title: ${book.title}</h5>
                    
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Publish Year: ${book.first_publish_year ? book.first_publish_year:"N/A"}</li>
                            <li class="list-group-item">Author name: ${book.author_name ? book.author_name:"N/A"}</li>
                            <li class="list-group-item">Publisher: ${book.publisher ? book.publisher:"N/A"}</li>
                        </ul>
                    </div>

                <div class = "card-footer">
                    <button class="btn btn-outline-dark">View More <i class="fas fa-arrow-right"></i></button> 
                </div>
            </div>
            `;
            searchResult.appendChild(div);
        });
        
    }
    
};
