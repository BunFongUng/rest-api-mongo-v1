export default app => {
    // send 404 if no other route matched
    app.use((req, res) => {
        res.status(404).json({
            message: 'Route Not Found',
        });
    });

    // variable to enable global error logging
    const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

    // setup a global error handler
    app.use((err, req, res, next) => {
        if (enableGlobalErrorLogging) {
            console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
        }

        res.status(err.status || 500).json({
            message: err.message,
            error: {},
        });
    });
}