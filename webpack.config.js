const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/pages/login/login.html",
      filename: "login.html",
      chunks: ["login"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/dashboard/dashboard.html",
      filename: "dashboard.html",
      chunks: ["dashboard"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/employee/employees.html",
      filename: "employees.html",
      chunks: ["employees"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/book/books.html",
      filename: "books.html",
      chunks: ["books"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/book/book_rented.html",
      filename: "book_rented.html",
      chunks: ["book_rented"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/client/clients.html",
      filename: "clients.html",
      chunks: ["clients"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/register/register-book.html",
      filename: "register-book.html",
      chunks: ["register_book"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/register/register-client.html",
      filename: "register-client.html",
      chunks: ["register_client"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/register/register-employee.html",
      filename: "register-employee.html",
      chunks: ["register_employee"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/register/register-loar.html",
      filename: "register-loar.html",
      chunks: ["register_loar"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/register/register-return.html",
      filename: "register-return.html",
      chunks: ["register_return"],
    }),
  ],
  entry: {
    login: "./src/pages/login/login.ts",
    dashboard: "./src/pages/dashboard/dashboard.ts",
    employees: "./src/pages/employee/employees.ts",
    books: "./src/pages/book/books.ts",
    book_rented: "./src/pages/book/book_rented.ts",
    clients: "./src/pages/client/clients.ts",
    register_book:"./src/pages/register/register-book.ts",
    register_client:"./src/pages/register/register-client.ts",
    register_employee:"./src/pages/register/register-employee.ts",
    register_loar:"./src/pages/register/register-loar.ts",
    register_return:"./src/pages/register/register-return.ts",

  },

  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },

  resolve: {
    extensions: [".ts", ".js"],
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                quietDeps: true,
              }
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      }
    ],
  },

  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    historyApiFallback: {
      index: "/login.html",
    },
    open: true,
    port: 3000,
  },

  mode: "development",
};