class ConfigError extends Error {
    constructor(message) {
        super(message);
        this.name = "ConfigError";
    }
}

function loadThreshold() {
    const maxItems = process.env.MAX_ITEMS;

    if (maxItems === undefined) {
        throw new ConfigError("Environment variable MAX_ITEMS was not found.");
    }

    const limit = Number(maxItems);

    if (Number.isNaN(limit)) {
        throw new ConfigError("MAX_ITEMS must be a valid number.");
    }

    return limit;
}

async function run(items) {
    const limit = loadThreshold();

    if (items.length > limit) {
        throw new Error(`Limit exceeded. Maximum: ${limit}, Received: ${items.length}`);
    }

    return items.map(item => item.toUpperCase());
}

const verbose = process.argv.includes("--verbose");

process.on("unhandledRejection", error => {
    console.error("Unhandled Promise Rejection:");
    console.error(error.message);
});

(async function () {

    try {

        const words = [
            "apple",
            "banana"
        ];

        const result = await run(words);

        console.log("Processed Items:");
        console.log(result);

    } catch (error) {

        if (verbose) {
            console.error(error.stack);
        } else {
            console.error(error.message);
        }

    }

})();
