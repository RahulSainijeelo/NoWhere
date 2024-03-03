document.addEventListener("DOMContentLoaded", function () {

    const bd = document.querySelector(".bcontainer");
    const links = document.querySelectorAll("a");
    const toggler1 = document.querySelector('.dv');
    const toggler2 = document.querySelector('.togglerOff');
    const cnclg = document.querySelector("#cnclg");
    const cncsg = document.querySelector("#cncsg");
    const msg = document.querySelector(".flMessage");
    const flmsg = document.querySelector(".flflMessage");
    if(flmsg){
        setTimeout(() => {
            if (!msg) {
                flmsg.style.display = "none";
            } else {
                msg.style.display = "none";
            }
        }, 2000);
    };

    const content = document.querySelector('.collaps');
    const Items = document.querySelectorAll(".nav-item");
    const navbgd = document.querySelector(".navbar");
    const footer = document.querySelector("footer");
    const btnn = document.querySelector(".btnn");
    const btnn2 = document.querySelector(".btnn2");
    btnn.style.display = "none";
    toggler1.style.display = "none";

    function showdd() {
        function toggleCheckboxes() {
            if (btnn.style.display === 'none') {
                btnn.style.display = 'inline';
                btnn2.style.display = 'none';
                toggler1.style.display = 'inline';
                toggler2.style.display = 'none';
                content.id = "divNav";
                Items.forEach((e) => {
                    e.id = "navItems"
                });
                btnn.checked = false;
            } else {
                btnn.style.display = 'none';
                btnn2.style.display = 'inline';
                toggler1.style.display = 'none';
                toggler2.style.display = 'inline';
                btnn2.checked = false;
                content.style.display = 'none';
                content.id = "";
            }
        }


        btnn2.addEventListener('change', toggleCheckboxes);


        btnn.addEventListener('change', toggleCheckboxes);

    }

    showdd();

    function resizePt() {
        btnn.checked = false;
        btnn2.style.display = 'inline';
        btnn.style.display = 'none';
        toggler2.style.display = 'inline';
        toggler1.style.display = 'none';
        if ((this.innerWidth > 700) && !btnn.checked) {
            content.style.display = 'block';
            content.id = "divNav";
            Items.forEach((e) => {
                e.id = "navItems"
            });

        }
        content.id = "";
    }
    window.addEventListener("resize", resizePt);

    const signUpln = document.querySelector(".signUpLgln");
    const loginln = document.querySelector(".loginLgln")
    const login = document.querySelector(".inclg");
    const signUp = document.querySelector(".incsg")
    if (loginln || signUpln) {
        loginln.addEventListener("click", (e) => {
            e.preventDefault();
            if (signUp.id == "signUpLg") { signUp.id = "" }
            login.id = "signUpLg";
            document.body.classList.add("no-scroll");
            bd.classList.add("opbg");
            footer.classList.add("opgbn");
            navbgd.classList.add("opbgn");
            resizePt();
            links.forEach((e) => {
                e.addEventListener("click", handleClick)
            })
        });

        signUpln.addEventListener("click", (e) => {
            if (login.id == "signUpLg") { login.id = "" }
            signUp.id = "signUpLg";
            resizePt();
            bd.classList.add("opbg");
            footer.classList.add("opgbn");
            navbgd.classList.add("opbgn");
            document.body.classList.add("no-scroll");
            links.forEach((e) => {
                e.addEventListener("click", handleClick)
            });
        });
    }

    document.addEventListener("click", function (event) {
        if (!login.contains(event.target) && event.target !== loginln &&
            !signUp.contains(event.target) && event.target !== signUpln) {
            signUp.id = "";
            login.id = "";
            document.body.classList.remove("no-scroll");
            bd.classList.remove("opbg");
            footer.classList.remove("opgbn");
            navbgd.classList.remove("opbgn");
            links.forEach((e) => {
                e.removeEventListener("click", handleClick)
            });
        };
        if (!btnn.checked) {
            resizePt();
        }
    }); function handleClick(e) {
        e.preventDefault();
    };

    if (cnclg) {
        cnclg.addEventListener("click", (event) => {
            if (!login.contains(event.target) && event.target !== loginln ||
                !signUp.contains(event.target) && event.target !== signUpln) {
                signUp.id = "";
                login.id = "";
                document.body.classList.remove("no-scroll");
                footer.classList.remove("opgbn");
                bd.classList.remove("opbg");
                navbgd.classList.remove("opbgn");
                links.forEach((e) => {
                    e.removeEventListener("click", handleClick)
                });
            };
        })
    };
    if (cncsg) {
        cncsg.addEventListener("click", (event) => {
            if (!login.contains(event.target) && event.target !== loginln ||
                !signUp.contains(event.target) && event.target !== signUpln) {
                signUp.id = "";
                login.id = "";
                document.body.classList.remove("no-scroll");
                bd.classList.remove("opbg");
                navbgd.classList.remove("opbgn");
                footer.classList.remove("opgbn");
                links.forEach((e) => {
                    e.removeEventListener("click", handleClick)
                });
            };
        })
    };
});






