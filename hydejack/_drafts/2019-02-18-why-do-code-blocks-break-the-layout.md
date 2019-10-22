# Why do Hydjeack's Code Blocks Break the Layout?

I get this question a lot, so I thought I'd put my thoughts on this to paper. First of all, what am I talking about? Basically, this:

    This is a code block. Usually it contains a code snippet and they have a tendency to get pretty long sometimes.

As you can see, code blocks take the full available screen width, and "break" the layout in the process. I've come to this conclusion by reasoning from first principles: What is the purpose of limiting the line length in the first place? Readability! We've all seen sites like [this](http://mason.gmu.edu/~rhanson/futarchy.html). While I'm a fan of simple websites, the complete lack of styling makes this hard to read, especially on really large displays. However, we've also all seen sites where there is plenty of avaialbe space, and yet the 

The goal for Hydejack was to make a theme that would appeal to "hackers", programmers, academics, but at the same time have a modern and cool design. However, whent the two conflict, appeal to hackers takes precedence. Reading code blocks with horizontal scroll bars is annoying, especially when there's plenty of free screen real estate right next to it. Yes, it looks nicer when content is the same width, but code is not read like text, hence there is not *usability* reason to limit it (same for math forumlas and tables). There's only aestateic reasons, and they are skin deep. 
