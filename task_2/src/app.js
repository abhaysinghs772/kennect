function isPrime (num){
    if (num <= 1) return false;
    if (num <= 3) return true;

    if (num % 2 === 0 || num % 3 === 0) return false;

    // every prime number can be be expressed as 6n(+ or -)1 where n will be inany postive integer
    // startig the i with 5, becasuse we already checked the divisiblity by 2 and 3
    for (let i = 5; i * i <= num; i+= 6){
        if (num % i === 0 || num % ( i + 2 ) === 0) return false;
    }

    return true;
}

function getPrimesInRange(a, b){
    let ans = [];
    let totalTimetakenInitial = 0;
    let totalTimetakenByPrime = 0;
    let j = 1; 
    let tbody_P_N = document.getElementsByClassName('row-2b')[0];
    let tbody_P = document.getElementsByClassName('row-2c')[0];
    
    let startTime = performance.now();

    for(let i = a; i <= b; i ++){
        let isPrimeOrNot = isPrime(i);
        let endTime = performance.now();
        totalTimetakenInitial = endTime - startTime;
        tbody_P_N.innerHTML += `
            <tr >
                <th scope="row">${j}</th>
                <td> ${i} </td>
                <td> ${isPrimeOrNot ? 'Prime' : 'Normal'}</td>
                <td> ${totalTimetakenInitial} </td>
            </tr>
        `;

        if(isPrimeOrNot){
            totalTimetakenByPrime = totalTimetakenInitial;
            tbody_P.innerHTML += `
                <tr>
                    <th scope="row">${j}</th>
                    <td> ${i} </td>
                    <td> ${totalTimetakenByPrime} </td>
                </tr>
            `;
            ans.push(i);
        }

        j++;
    }

    return { ans, totalTimetakenInitial , totalTimetakenByPrime};
}

const submitBtn = document.getElementById('submit');

let calcHandler = (e) => {
    e.preventDefault();

    const input1 = document.getElementById('input-1').value;
    const input2 = document.getElementById('input-2').value;

    if (!input1 || !input2) {
        alert('both input fields are mendatory');
        return;
    }

    if (input1 > input2) {
        alert('input 1 should be lesser then input 2')
        return;
    }

    let startTime = performance.now();
    let res = getPrimesInRange(input1, input2);

    let endTime = performance.now();

    let totalTimetaken = endTime - startTime;

    let td1 = document.getElementById('gpir');
    let td2 = document.getElementById('ip');
    
    
    td1.innerText = totalTimetaken;
    // avg of a 
    let avg_of_2b_2c = ((totalTimetaken / input2 ) + ( res.totalTimetakenByPrime / res.ans.length ) / 2);
    
    let two_d = document.getElementById('2-d');
    two_d.innerText = `the average time taken by 2b and 2c is = ${avg_of_2b_2c}`

    startTime = endTime = totalTimetaken = 0;
    td2.innerText = res.totalTimetakenInitial;

};

submitBtn.addEventListener('click', calcHandler);