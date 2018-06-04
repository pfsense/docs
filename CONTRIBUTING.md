# Contributing

Thank you for your interest in contributing to the pfSense documentation!

The document covers the process for contributing to the articles that are hosted on the [pfSense documentation site](https://www.netgate.com/docs/pfsense). Contributions may be as simple as typo corrections or as complex as new articles.

* [Process for contributing](#process-for-contributing)
* [DOs and DON'Ts](#dos-and-donts)
* [Building the docs](#building-the-docs)
* [Voice and tone guidelines](#voice-and-tone-guidelines)

Issues and tasks for all these repositories are tracked here.

## Process for contributing

You need a basic understanding of [Git and GitHub.com](https://guides.github.com/activities/hello-world/).

**Step 1:** Skip this step for small changes. If you're interested in writing new content or in thoroughly revising existing content, open an [issue](https://github.com/pfsense/docs/issues) describing what you want to do.
The content inside the **docs** folder is organized into sections that are reflected in the Table of Contents (TOC). Define where the topic will be located in the TOC. Get feedback on your proposal.

-or-

You can also choose from our existing [open issues](https://github.com/pfsense/docs/issues) list for which community contributions are welcome. Depending on your interests and level of commitment, you can choose from issues that typically fall into the following categories:

- **Maintenance**. This category includes fairly simple contributions, such as fixing broken or incorrect links, or addressing limited content issues. In some cases, these issues may concern large numbers of files. In that case, you should let us know what you'd like to work on before you begin.

- **Guidelines adherence**. You might notice that some of the topics are not currently following all the guidelines specified here and on the [style guide](/source/references/style-guide.rst) as well. We're working towards achieving consistency throughout the site.

- **Content updates**. Given the enormity of the doc set, content easily becomes outdated and requires revision. In addition, for a variety of reason, some content has been duplicated or even triplicated. Updating content involves making sure that individual topics are current or revising content in a feature area to eliminate duplication and ensure that all unique content is preserved in the smaller documentation set.

- **New content authoring**. If you're interested in authoring your own topic, these issues list topics that we know we'd like to add to our doc set. Let us know before you begin working on a topic, though. If you're interested in writing a topic that isn't listed here, open an issue.

**Step 2:** Fork the `/pfsense/docs` repo and create a branch for your changes.

For small changes, you can use GitHub's web interface. Simply click the **Edit the file in your fork of this project** on the file you'd like to change. GitHub creates the new branch for you when you submit the changes.

**Step 3:** Make the changes on this new branch.

Navigate to the folder that corresponds to the TOC location determined for your article in step 1.

That folder contains the reStructuredText files for all articles in that section.

If necessary, create a new folder to place the files for your content. The main article for that section is called *index.rst*.

Place images and other static resources inside the **_static** folder using the same folder path that contains your article, if it doesn't already exist then create the necessary folder structure.

Be sure to follow the proper reStructuredText syntax. For more information, see the [style guide](/source/references/style-guide.rst).

### Example structure

    source
      /_static
        /nat
        /vpn
          /ipsec
            tunnel-up.png
      /nat
      /vpn
        /ipsec
          creating-a-site-to-site-tunnel.rst

**Step 4:** Submit a Pull Request (PR) from your branch to `pfsense/docs/master`.

Each PR should usually address one issue at a time. The PR can modify one or multiple files. If you're addressing multiple fixes on different files, separate PRs are preferred.

If your PR is addressing an existing issue, add the `Fixes #Issue_Number` keyword to the commit message or PR description. That way, the issue is automatically closed when the PR is merged. For more information, see [Closing issues via commit messages](https://help.github.com/articles/closing-issues-via-commit-messages/).

The core team will review your PR and let you know if there are any other updates/changes necessary in order to approve it.

**Step 5:** Make any necessary updates to your branch as discussed with the team.

The maintainers will merge your PR into the master branch once feedback has been applied and your change is approved.

On a certain cadence, we deploy all commits from master branch and then you'll be able to see your contribution live at https://www.netgate.com/docs/pfsense.

## DOs and DON'Ts

The following list shows some guiding rules that you should keep in mind when you're contributing to the pfSense documentation:

- **DON'T** surprise us with large pull requests. Instead, file an issue and start a discussion so we can agree on a direction before you invest a large amount of time.
- **DO** read the [style guide](/source/references/style-guide.rst) and [voice and tone](#voice-and-tone-guidelines) guidelines.
- **DO** create a separate branch on your fork before working on the articles.
- **DO** follow the [GitHub Flow workflow](https://guides.github.com/introduction/flow/).
- **DO** blog and tweet (or whatever) about your contributions, frequently!

## Building the docs locally

Building the docs locally will allow you to preview your changes, before you make a Pull Request.

### Install the tooling

Clone this repo and install sphinx and other dependencies using `pip`:

```
pip install -r requirements.txt
```

### Build the HTML

To perform an incremental build, run:

```
sphinx-build -b html -d ./build/doctrees ./source/ ./build/
```

or create a **draft.sh** file in root directory of the repo so you don't have to remember it all:

```
#!/bin/bash
#draft script for building local docs

if [ "$1" = "full" ]; then
  full_flag='-E'
fi

sphinx-build -b html $full_flag -d ./build/doctrees ./source/ ./build/
```

Running `./draft.sh full` will perform a full build, which you might find necessary occasionally.

### View it locally

You can use Python's simple webserver to view it in your browser. For example with Python 3, run the following:

```
cd build
python -m http.server
```

## Voice and tone guidelines

A wide variety of people including IT Pros and developers read your documents. Your goal is to create great documentation that helps the reader on their journey. Our guidelines help with that. Our style guide contains the following recommendations:

- [Use a Conversational Tone](#use-a-conversational-tone)
- [Write in Second Person](#write-in-second-person)
- [Use Active Voice](#use-active-voice)
- [Target a 5th Grade Reading Level](#target-a-fifth-grade-reading-level)
- [Avoid future tense](#avoid-future-tense)
- [What is it - so what?](#what-is-it-so-what)

You can see examples of each of these as you read this style guide. We've written this guide
following our guidelines to provide examples for you to follow as you build documentation.

### Use a Conversational Tone

#### Appropriate Style:
We want our documentation to have a conversational tone. You should feel as though you
are having a conversation with the author as you read any of our tutorials or explanations.
For you, the experience should be informal, conversational, and informative. Readers should
feel as though they are listening to the author explain the concepts to them.

#### Inappropriate Style:
One might see the contrast between a conversational style and the style one finds with
more academic treatments of technical topics. Those resources are very useful, but the authors
have written those articles in a very different style than our documentation. When one reads
an academic journal, one finds a very different tone and a very different style of writing.
One feels that they are reading a dry account of a very dry topic.

The first paragraph above follows our recommendation conversational style. The second
is a more academic style. You see the difference immediately.

### Write in second person

#### Appropriate Style:
You should write your articles as though you are speaking directly to the reader. You
should use second person often (as I just have in these two sentences). 2nd person doesn't
always mean using the word 'you'. Write directly to the reader. Write imperative sentences.
Tell your reader what you want them to learn.

#### Inappropriate Style:
An author could also choose to write in third person. In that model, an author must find some
pronoun or noun to use when referring to the reader. A reader might often find this third
person style less engaging and less enjoyable to read.

The first paragraph follows our recommended style. The second uses third person. Please write
in second person. You probably found that much easier to read.

### Use Active Voice

Write your articles in active voice. Active voice means that the subject of the sentence performs
the action (verb) of that sentence. It contrasts with passive voice, where the sentence is arranged
such that the subject of the sentence is acted upon. Contrast these two examples:

>The compiler transformed source code into an executable.

>The source code was transformed into an executable by the compiler.

The first sentence uses active voice. The second sentence was written in passive voice.
(Those two sentences provide another example of each style).

We recommend active voice because it is more readable. Passive voice can be more difficult to read.

### Target a Fifth Grade Reading Level

We provide this final guideline because many of our readers are not native English speakers.
You are reaching an international audience with your articles. Please take into account that
they may not have the English vocabulary you have.

However, you are still writing for technical professionals. You can assume that your readers
have networking knowledge and the specific vocabulary for networking terms.

### Avoid future tense

In some non-English languages the concept of future tense is not the same as English. Using future tense can make your documents harder to read. Additionally, when using the future tense, the obvious question is when. So if you say 'Learning Python will be good for you" - the obvious question for the reader is when will it be good? Instead, just say "Learning Python is good for you".

### What is it - so what?

Whenever you introduce a new concept to the reader, define the concept and only then explain why it's useful. It's important for reader to understand what something is before they can understand the benefits (or otherwise).

*Thanks to the [.NET docs](https://github.com/dotnet/docs) for the inspiration on this page.*
