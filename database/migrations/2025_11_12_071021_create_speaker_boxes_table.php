<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('speaker_boxes', function (Blueprint $table) {
            $table->id();
            $table->string('nama')->nullable();
            $table->string('ukuran')->nullable();
            $table->string('bahan')->nullable();
            $table->bigInteger('harga')->nullable();
            $table->string('gambar')->nullable();
            $table->text('deskripsi')->nullable();
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('speaker_boxes');
    }
};
