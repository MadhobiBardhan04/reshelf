import { co2 } from "@tgwf/co2";

const carbon = new co2();

function carbonTracker(req, res, next) {
  let bytesTransferred = 0;

  const originalWrite = res.write;
  const originalEnd = res.end;

  function getSize(chunk, encoding) {
    if (chunk == null) return 0;

    if (Buffer.isBuffer(chunk)) {
      return chunk.length;
    }

    if (typeof chunk === "string") {
      return Buffer.byteLength(chunk, encoding);
    }

    return 0;
  }

  res.write = function (chunk, encoding, callback) {
    bytesTransferred += getSize(chunk, encoding);
    return originalWrite.call(this, chunk, encoding, callback);
  };

  res.end = function (chunk, encoding, callback) {
    bytesTransferred += getSize(chunk, encoding);
    return originalEnd.call(this, chunk, encoding, callback);
  };

  res.on("finish", () => {
    const estimatedCO2 = carbon.perByte(bytesTransferred);

    console.log({
      method: req.method,
      route: req.originalUrl,
      status: res.statusCode,
      bytesTransferred,
      estimatedCO2: Number(estimatedCO2.toFixed(6)),
      unit: "grams CO2e",
    });
  });

  next();
}

export default carbonTracker;
