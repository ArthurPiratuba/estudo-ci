var gulp = require("gulp"); //Modulo geral
var jshint = require("gulp-jshint"); //dicas do qualidade de código, ponto e virgula, not defined etc
var clean = require("gulp-clean");//apaga arquivos
var concat = require("gulp-concat");//concatena arquivos em um só
var uglify = require("gulp-uglify");//minifica js
var htmlmin = require("gulp-htmlmin"); //minifica html
var cleanCSS = require("gulp-clean-css"); //minifica CSS
var runSequence = require("run-sequence"); //executa tasks em uma sequencia predefinida
var rename = require("gulp-rename"); //renomeia arquivos

gulp.task("clean", function(){
    return gulp.src("dist/")
    .pipe(clean());
});


gulp.task("jshint", function(){
    return gulp.src("public/js/**/*.js")
    .pipe(jshint())
    .pipe(jshint.reporter("default"));
});

gulp.task("uglify", function(){
    gulp.src(["public/js/**/*.js"])
    .pipe(uglify())
    .pipe(concat('all.js'))
    .pipe(gulp.dest("dist/js"))
});

gulp.task("htmlmin",function(){
    return gulp.src("public/views/**/*.html").
    pipe(htmlmin({collapseWhitespace:true}))
    .pipe(gulp.dest("dist/view"));
});

gulp.task("cssmin", function(){
    return gulp.src(["public/lib_old/bootstrap/bootstrap.css", "public/css/*.css"])
    .pipe(cleanCSS())
    .pipe(concat("styles.mim.css"))
    .pipe(gulp.dest("dist/css"));
});

gulp.task("copy", function(){
    return gulp.src("public/index-prod.html")
    .pipe(rename("index.html"))
    .pipe(gulp.dest("dist/"));
});

gulp.task("default",function(cb){
    return runSequence("clean", ["jshint", "uglify", "htmlmin", "cssmin", "copy"], cb);
});