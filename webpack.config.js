const path = require('path'); // подключаем path к конфигу вебпак
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // Указываем входной файл для сборки
  entry: { 
    main: './src/index.js'
  },
  // Настраиваем выходной путь и имя файла для собранного кода
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
        publicPath: '',
    /*assetModuleFilename: 'images/[hash][ext][query]'*/
  },
    mode: 'development', //добавили режим разработчика
      // Настройки для локального сервера разработки
  devServer: {
    static: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
    compress: true, // это ускорит загрузку в режиме разработки
    port: 8081, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт
    open: true // сайт будет открываться сам при запуске npm run dev
  },
  module: {
    rules: [ // rules — это массив правил 
    // добавим в него объект правил для бабеля
      {
        test: /\.js$/, // регулярное выражение, которое ищет все js файлы
        use: 'babel-loader',  // при обработке этих файлов нужно использовать babel-loader
        exclude: '/node_modules/' // исключает папку node_modules, файлы в ней обрабатывать не нужно
      },
      {
        // регулярное выражение, которое ищет все файлы с такими расширениями
    test: /\.(png|svg|jpg|jpeg|gif)$/,
    type: 'asset/resource',
    generator: {
      filename: 'images/[name].[hash][ext]',
    }
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[hash][ext]'
        }
      },
      {test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, {
        loader: 'css-loader',
    options: { 
      importLoaders: 1 
    }
  },
  'postcss-loader'
    ]
  },
]
},
  devtool: 'source-map',
  plugins: [
      // Плагин для создания HTML файла на основе шаблона
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
        new CleanWebpackPlugin(),  // Плагин для очистки выходной директории перед каждой сборкой
        new MiniCssExtractPlugin(), // подключение плагина для объединения файлов
  ]
};

