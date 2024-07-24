function convertToMontlyReturnRate(yearlyReturnRate) {
    yearlyReturnRate ** (1/12);
}

function generateReturnsArray(
    startingAmount = 0, 
    timeHorizon = 0, 
    timePeriod = 'monthly', 
    monthlyContribution = 0, 
    returnRate = 0, 
    returnTimeFrame = 'monthly'
) {
    if (!timeHorizon || !startingAmount) {
        throw new Error("Investimento e prazo devem ser preenchidos com valores positivos.")
    }

    const finalReturnRate = returnTimeFrame === 'monthly' ? 1 + returnRate / 100 
    : convertToMontlyReturnRate(1 + returnRate/100);

    const finalTimeHorizon = timePeriod === 'monthly' ? timeHorizon : timeHorizon * 12;

    const referenceInvestmentObject = {
        investedAmount : startingAmount,
        interestReturn: 0,
        totalInterestReturns: 0, 
        month: 0,
        totalAmount: startingAmount,
    };

    const returnsArrays = [referenceInvestmentObject]
    for (let timeReference = 1; timeReference <= finalTimeHorizon; timeReference++){
        const totalAmount = (returnsArrays[timeReference - 1].totalAmount * finalReturnRate) + monthlyContribution;
        const interestReturn = returnsArrays[timeReference - 1].totalAmount * finalReturnRate;
        const investedAmount = startingAmount + monthlyContribution * timeReference;
        const totalInterestReturns = totalAmount - investedAmount;
        returnsArrays.push({
            investedAmount,
            interestReturn,
            totalInterestReturns,
            month: timeReference,
            totalAmount,
        }) 
    }
    return returnsArrays;
}