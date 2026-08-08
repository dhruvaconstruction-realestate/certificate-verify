document.addEventListener("DOMContentLoaded", function () {

    const loading =
        document.getElementById("loading");

    const certificateContent =
        document.getElementById("certificateContent");

    const errorBox =
        document.getElementById("errorBox");


    const certificateNo =
        document.getElementById("certificateNo");

    const candidateName =
        document.getElementById("candidateName");

    const candidateRoll =
        document.getElementById("candidateRoll");

    const candidateMobile =
        document.getElementById("candidateMobile");

    const candidateAddress =
        document.getElementById("candidateAddress");

    const candidatePhoto =
        document.getElementById("candidatePhoto");

    const institute =
        document.getElementById("institute");

    const project =
        document.getElementById("project");

    const training =
        document.getElementById("training");

    const score =
        document.getElementById("score");


    const errorTitle =
        document.getElementById("errorTitle");

    const errorMessage =
        document.getElementById("errorMessage");

    const searchedId =
        document.getElementById("searchedId");


    /*
     * GET CERTIFICATE ID FROM URL
     *
     * Example:
     *
     * ?id=DC-2026-0702
     */

    const urlParams =
        new URLSearchParams(window.location.search);

    const requestedId =
        urlParams.get("id");


    /*
     * NO ID PROVIDED
     */

    if (!requestedId) {

        showError(
            "Certificate ID Required",
            "Please provide a valid certificate verification ID.",
            "Not provided"
        );

        return;
    }


    /*
     * LOAD DATA.JSON
     */

    fetch("data.json", {
        cache: "no-store"
    })

    .then(function (response) {

        if (!response.ok) {

            throw new Error(
                "Unable to load certificate data."
            );

        }

        return response.json();

    })


    .then(function (certificates) {


        /*
         * FIND CERTIFICATE
         */

        const certificate =
            certificates.find(function (item) {

                return String(item.certificateNo)
                    .trim()
                    .toUpperCase()
                    ===
                    String(requestedId)
                    .trim()
                    .toUpperCase();

            });


        /*
         * INVALID CERTIFICATE
         */

        if (!certificate) {

            showError(
                "Invalid Certificate",
                "Certificate not found or the verification ID is invalid.",
                requestedId
            );

            return;
        }


        /*
         * DISPLAY CERTIFICATE
         */

        displayCertificate(certificate);

    })


    .catch(function (error) {

        console.error(error);

        showError(
            "Verification System Error",
            "Unable to load certificate verification data. Please try again later.",
            requestedId
        );

    });


    /*
     * DISPLAY CERTIFICATE
     */

    function displayCertificate(certificate) {


        certificateNo.textContent =
            certificate.certificateNo ||
            "Not available";


        candidateName.textContent =
            certificate.name ||
            "Not available";


        candidateRoll.textContent =
            certificate.roll ||
            "Not available";


        candidateMobile.textContent =
            certificate.mobile ||
            "Not available";


        candidateAddress.textContent =
            certificate.address ||
            "Not available";


        /*
         * INSTITUTE
         *
         * If institute is missing from data.json,
         * show "Not available".
         */

        institute.textContent =
            certificate.institute ||
            "Not available";


        project.textContent =
            certificate.project ||
            "Not available";


        training.textContent =
            certificate.training ||
            "Not available";


        score.textContent =
            certificate.score ||
            "0";


        /*
         * PHOTO
         */

        if (certificate.photo) {

            candidatePhoto.src =
                certificate.photo;

            candidatePhoto.style.display =
                "block";

        } else {

            candidatePhoto.style.display =
                "none";

        }


        /*
         * PHOTO ERROR
         */

        candidatePhoto.onerror =
            function () {

                this.style.display =
                    "none";

            };


        /*
         * SHOW CERTIFICATE
         */

        loading.classList.add("hidden");

        errorBox.classList.add("hidden");

        certificateContent.classList.remove("hidden");


        /*
         * CHANGE PAGE TITLE
         */

        document.title =
            (certificate.name || "Certificate") +
            " | Certificate Verification | Dhruva Construction & Real Estate";

    }


    /*
     * ERROR FUNCTION
     */

    function showError(
        title,
        message,
        id
    ) {

        loading.classList.add("hidden");

        certificateContent.classList.add("hidden");

        errorBox.classList.remove("hidden");


        errorTitle.textContent =
            title;


        errorMessage.textContent =
            message;


        searchedId.textContent =
            id || "Not provided";


        document.title =
            "Invalid Certificate | Dhruva Construction & Real Estate";

    }

});
