"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrismaClientClass = getPrismaClientClass;
const runtime = __importStar(require("@prisma/client/runtime/client"));
const config = {
    "previewFeatures": [],
    "clientVersion": "7.0.0",
    "engineVersion": "0c19ccc313cf9911a90d99d2ac2eb0280c76c513",
    "activeProvider": "postgresql",
    "inlineSchema": "// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider = \"prisma-client\"\n  output   = \"../generated/prisma\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n}\n\n// Enums\nenum Role {\n  CUSTOMER\n  WASHER\n  ADMIN\n}\n\nenum BookingStatus {\n  PENDING\n  ASSIGNED\n  EN_ROUTE\n  ARRIVED\n  IN_PROGRESS\n  COMPLETED\n  CANCELLED\n}\n\nenum PaymentStatus {\n  UNPAID\n  PENDING\n  PAID\n  FAILED\n}\n\n// Models\nmodel User {\n  id           String   @id @default(uuid())\n  email        String   @unique\n  password     String\n  role         Role     @default(CUSTOMER)\n  refreshToken String?\n  createdAt    DateTime @default(now())\n  updatedAt    DateTime @updatedAt\n\n  // Relations\n  bookings       Booking[]\n  payments       Payment[]\n  washerBookings Booking[]       @relation(\"WasherBookings\")\n  washerLocation WasherLocation?\n\n  @@map(\"users\")\n}\n\nmodel Service {\n  id          String   @id @default(uuid())\n  title       String\n  description String?\n  price       Decimal  @db.Decimal(10, 2)\n  createdAt   DateTime @default(now())\n  updatedAt   DateTime @updatedAt\n\n  // Relations\n  bookings Booking[]\n\n  @@map(\"services\")\n}\n\nmodel Booking {\n  id        String        @id @default(uuid())\n  userId    String\n  serviceId String\n  washerId  String?\n  latitude  Decimal       @db.Decimal(10, 8)\n  longitude Decimal       @db.Decimal(11, 8)\n  date      DateTime\n  time      String\n  status    BookingStatus @default(PENDING)\n  createdAt DateTime      @default(now())\n  updatedAt DateTime      @updatedAt\n\n  // Relations\n  user    User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n  service Service  @relation(fields: [serviceId], references: [id], onDelete: Cascade)\n  washer  User?    @relation(\"WasherBookings\", fields: [washerId], references: [id], onDelete: SetNull)\n  payment Payment?\n\n  @@map(\"bookings\")\n}\n\nmodel Payment {\n  id          String        @id @default(uuid())\n  bookingId   String        @unique\n  userId      String\n  amount      Decimal       @db.Decimal(10, 2)\n  status      PaymentStatus @default(UNPAID)\n  paymentDate DateTime?\n  createdAt   DateTime      @default(now())\n  updatedAt   DateTime      @updatedAt\n\n  // Relations\n  booking Booking @relation(fields: [bookingId], references: [id], onDelete: Cascade)\n  user    User    @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@map(\"payments\")\n}\n\nmodel WasherLocation {\n  id        String   @id @default(uuid())\n  washerId  String   @unique\n  latitude  Decimal  @db.Decimal(10, 8)\n  longitude Decimal  @db.Decimal(11, 8)\n  updatedAt DateTime @updatedAt\n\n  // Relations\n  washer User @relation(fields: [washerId], references: [id], onDelete: Cascade)\n\n  @@map(\"washer_locations\")\n}\n",
    "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
    }
};
config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"password\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"role\",\"kind\":\"enum\",\"type\":\"Role\"},{\"name\":\"refreshToken\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"bookings\",\"kind\":\"object\",\"type\":\"Booking\",\"relationName\":\"BookingToUser\"},{\"name\":\"payments\",\"kind\":\"object\",\"type\":\"Payment\",\"relationName\":\"PaymentToUser\"},{\"name\":\"washerBookings\",\"kind\":\"object\",\"type\":\"Booking\",\"relationName\":\"WasherBookings\"},{\"name\":\"washerLocation\",\"kind\":\"object\",\"type\":\"WasherLocation\",\"relationName\":\"UserToWasherLocation\"}],\"dbName\":\"users\"},\"Service\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"title\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"price\",\"kind\":\"scalar\",\"type\":\"Decimal\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"bookings\",\"kind\":\"object\",\"type\":\"Booking\",\"relationName\":\"BookingToService\"}],\"dbName\":\"services\"},\"Booking\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"serviceId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"washerId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"latitude\",\"kind\":\"scalar\",\"type\":\"Decimal\"},{\"name\":\"longitude\",\"kind\":\"scalar\",\"type\":\"Decimal\"},{\"name\":\"date\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"time\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"status\",\"kind\":\"enum\",\"type\":\"BookingStatus\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"BookingToUser\"},{\"name\":\"service\",\"kind\":\"object\",\"type\":\"Service\",\"relationName\":\"BookingToService\"},{\"name\":\"washer\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"WasherBookings\"},{\"name\":\"payment\",\"kind\":\"object\",\"type\":\"Payment\",\"relationName\":\"BookingToPayment\"}],\"dbName\":\"bookings\"},\"Payment\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"bookingId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"amount\",\"kind\":\"scalar\",\"type\":\"Decimal\"},{\"name\":\"status\",\"kind\":\"enum\",\"type\":\"PaymentStatus\"},{\"name\":\"paymentDate\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"booking\",\"kind\":\"object\",\"type\":\"Booking\",\"relationName\":\"BookingToPayment\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"PaymentToUser\"}],\"dbName\":\"payments\"},\"WasherLocation\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"washerId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"latitude\",\"kind\":\"scalar\",\"type\":\"Decimal\"},{\"name\":\"longitude\",\"kind\":\"scalar\",\"type\":\"Decimal\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"washer\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"UserToWasherLocation\"}],\"dbName\":\"washer_locations\"}},\"enums\":{},\"types\":{}}");
async function decodeBase64AsWasm(wasmBase64) {
    const { Buffer } = await Promise.resolve().then(() => __importStar(require('node:buffer')));
    const wasmArray = Buffer.from(wasmBase64, 'base64');
    return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
    getRuntime: async () => await Promise.resolve().then(() => __importStar(require("@prisma/client/runtime/query_compiler_bg.postgresql.mjs"))),
    getQueryCompilerWasmModule: async () => {
        const { wasm } = await Promise.resolve().then(() => __importStar(require("@prisma/client/runtime/query_compiler_bg.postgresql.wasm-base64.mjs")));
        return await decodeBase64AsWasm(wasm);
    }
};
function getPrismaClientClass() {
    return runtime.getPrismaClient(config);
}
//# sourceMappingURL=class.js.map