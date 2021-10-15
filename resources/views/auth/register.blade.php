@extends('layouts.app')

@section('content')
<div class="register">
    <h1>Sign Up</h1>
    <form method="POST" action="/register">
        @csrf
        <div class="input-form">
            <label class="ml30 required" for="name">username</label>
            <input id="name" type="text" class="form-control @error('name') is-invalid @enderror" name="name" value="{{ old('name') }}" autocomplete="name" autofocus>
            @error('name')
                <p class="error-message ml30">{{ $message }}</p>
            @enderror
        </div>
        <div class="input-form">
            <label class="ml30 required" for="email">Email</label>
            <input id="email" type="email" name="email" value="{{ old('email') }}" autocomplete="email">
            @error('email')
                <p class="error-message ml30">{{ $message }}</p>
            @enderror
        </div>
        <div class="input-form">
            <label class="ml30 required" for="password">password</label>
            <input id="password" type="password" name="password" autocomplete="new-password">
            @error('password')
                <p class="error-message ml30">{{ $message }}</p>
            @enderror
        </div>
        <div class="input-form">
            <label class="ml30 required" for="password-confirm">confirm password</label>
            <input id="password-confirm" type="password" name="password_confirmation" autocomplete="new-password">
        </div>
        <button class="button-middle" type="submit">Sign Up</button>
        <a href="/login">Return to Sign In</a>
    </form>
</div>
@endsection