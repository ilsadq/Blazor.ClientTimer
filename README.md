# Blazor.ClientTimer

A lightweight Blazor component for client-side countdown timers with customizable formatting.

### Features

- Client-side rendering - Timer updates happen in the browser without server roundtrips
- Customizable format - Display time in any format using dayjs duration formatting
- Configurable interval - Set update frequency to balance performance and precision
- Simple API - Just set an end time and format string

### Installation

```bash
dotnet add package Blazor.ClientTimer
```

### Setup

Add the required JavaScript file to your `App.razor` or `_Layout.cshtml`:

```html
<script src="_content/Blazor.ClientTimer/TimerCountdown.js"></script>
```

Add the using directive to your _Imports.razor:

### Usage

#### Basic Example

```html
<TimerCountdown End="@_endTime" Format="HH:mm:ss"/>

@code {
    private DateTime _endTime = DateTime.Now.AddHours(2);
}
```

#### Custom Interval

```html
<TimerCountdown End="@_endTime" 
                Format="HH:mm:ss" 
                Interval="500"/>

@code {
    private DateTime _endTime = DateTime.Now.AddMinutes(30);
}
```

### How It Works

The component:

- Converts the End DateTime to a Unix timestamp
- Passes it to a client-side web component (`<timer-countdown>`)
- JavaScript handles the countdown logic and display updates
- No server communication required after initial render

### Browser Compatibility

Requires browsers with support for:

- Custom Elements (Web Components)
- dayjs library (included with the component)
