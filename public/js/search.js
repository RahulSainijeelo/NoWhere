document.addEventListener("DOMContentLoaded",()=>{
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.querySelector('.search');
    const searchbtn = document.querySelector(".searchbtn");
    const searchForm = document.querySelector(".searchForm");
    
    searchInput.addEventListener('input', function() {
        const query = searchInput.value.trim();
        if (query !== '') {
            fetch(`/allQueries?query=${query}`)
                .then(response => response.json())
                .then(results => {
                    // Display search results
                    searchResults.innerHTML = '';
                    searchInput.style.borderRadius = "10px 10px 0px 0px";
                    searchbtn.style.borderRadius = "0px 10px 0px 0px";
                    searchResults.classList.add("searchDiv");
                    results.forEach((result,index) => {
                        searchResults.innerHTML += `<p><a href="/listings/${result._id}">${result.title}</a></p><br><hr class="searchResultHr">`;
                    });
                })
                .catch(error => console.error('Error searching:', error));
        } else {
            searchInput.style.borderRadius = "";
            searchbtn.style.borderRadius = "";
            searchResults.classList.remove("searchDiv");
            searchResults.innerHTML = ''; // Clear results if query is empty
        }
    });
    searchForm.addEventListener("submit", function(event) {
        event.preventDefault();
        if (searchInput.value.trim() === "") {
            return;
        };
        this.submit();
    });
    
});