import * as $ from "jquery";

interface AnalyticsProps {
    destroy: () => void;
    getClicks: () => number|string;
}

function createAnalytics():AnalyticsProps{
    let counter:number = 0;
    let isDestroyed:boolean = false;

    const listener:()=>number = () => counter++;

    $(document).on("click", listener);

    return {
        destroy() {
            $(document).off("click", listener);
            isDestroyed = true;
        },
        getClicks() {
            if(isDestroyed) {
                return `Analytics is destroyed: Total count is ${counter}`;
            }
            return counter;
        }
    }
}

window["analytics"] = createAnalytics();