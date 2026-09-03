const input = document.getElementById("lettersOnly");

input.addEventListener("input", function () {
    input.value = input.value.replace(/[^a-zA-Z]/g, "");
});
