const salaryInput = document.getElementById('salary');
const costCategoryInputs = document.getElementsByClassName('cost-category');
const totalCostsInput = document.getElementById('total-costs');
const remainingInput = document.getElementById('remaining');
const addCategoryButton = document.getElementById('add-category-button');
const costCategoriesContainer = document.getElementById('cost-categories-container');

salaryInput.addEventListener('input', calculateRemaining);
Array.from(costCategoryInputs).forEach(function (input) {
    input.addEventListener('input', calculateTotalCosts);
});

addCategoryButton.addEventListener('click', addNewCategory);

function calculateRemaining() {
    const salary = parseFloat(salaryInput.value.replace(/,/g, '')) || 0;
    const costs = parseFloat(totalCostsInput.value.replace(/,/g, '')) || 0;

    const remaining = (salary - costs)*12;
    remainingInput.value = numberWithCommas(remaining.toFixed(2));

    // Add conditional statement to change color based on remaining value
    if (remaining >= 0) {
        remainingInput.style.color = '#009900'; // Green color
    } else {
        remainingInput.style.color = '#ff0000'; // Red color
    }
}

function calculateTotalCosts() {
    let totalCosts = 0;

    Array.from(costCategoryInputs).forEach(function (input) {
        const cost = parseFloat(input.value.replace(/,/g, '')) || 0;
        totalCosts += cost;
    });

    totalCostsInput.value = numberWithCommas(totalCosts.toFixed(2));

    calculateRemaining(); // Call calculateRemaining whenever total costs change
}

function addNewCategory() {
    const newCategoryDiv = document.createElement('div');
    const newCategoryLabel = document.createElement('label');
    newCategoryLabel.textContent = 'New Category:';
    const newCategoryInput = document.createElement('input');
    newCategoryInput.type = 'number';
    newCategoryInput.classList.add('cost-category');
    newCategoryInput.placeholder = 'Enter cost for new category';

    newCategoryDiv.appendChild(newCategoryLabel);
    newCategoryDiv.appendChild(newCategoryInput);
    costCategoriesContainer.appendChild(newCategoryDiv);

    newCategoryInput.addEventListener('input', calculateTotalCosts);
}

function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
