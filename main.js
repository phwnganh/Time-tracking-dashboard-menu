const menuItems = document.querySelectorAll(".profile-card--menu li")

let results = [];

const handleRenderData = async () => {
    try {
        const res = await fetch('./data.json')
        results = await res.json()
        // mac dinh la weekly menu item
        updateUIs("weekly")
    }catch (error){
        console.log(error)
    }
}

handleRenderData()

menuItems.forEach((item => {
    item.addEventListener("click", () => {
        const period = item.dataset.period;

        menuItems.forEach((li => li.classList.remove("active")))
        item.classList.add("active");
    updateUIs(period)
        console.log("period: ", period)
    })
}))

const updateUIs = period => {
    const previousLabels = {
        daily: "Yesterday",
        weekly: "Last Week",
        monthly: "Last Month",
    }
    results.forEach(item => {
        const card = document.querySelector(`.activity-card[data-title="${item.title}"]`)
        if(!card) return

        const currentElement = card.querySelector('.activity-card--current')
        const previousElement = card.querySelector('.activity-card--previous')

        const current = item.timeframes[period].current;
        const previous = item.timeframes[period].previous;

        currentElement.textContent = `${current}hrs`
        previousElement.textContent = `${previousLabels[period]} - ${previous}hrs`
    })
}