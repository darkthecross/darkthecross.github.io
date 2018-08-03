---
#layout: post
layout: post
title:  "Reinforcement Learning Experiments"
date:   2018-08-02 00:52:31 -0700
category: Computer Vision and Machine Learning
description: This project includes some reinforcement learning experiments.
permalink: /rl_experiments.html
title-image: rl_experiments_title.png
github: https://github.com/DarkTheCross/rl_experiments
---

![pong](/assets/posts_img/rl_experiments/pong.gif)

Reinforcement learning is a very popular yet very controversial topic in robotics. While it surely achieves amazing results in video games and some other situations where the transition function is relatively deterministic and easy to simulate, the black-box feature and unstable performance raised a lot of arguments about its application.

I worked on this project to get some basic knowledge of reinforcement learning and have some fun solving problems automatically.

All three problems in this project was solved using Q learning:

'''
A
'''

The cart-pole problem should be the easiest and most common one. Nothing mysterious here. It was solved in 456 steps, which is a pretty good (and lucky) score for q learning.

<img style="width: 100%" src="/assets/posts_img/rl_experiments/cart_pole.png" />

I developed an apple-picker game environment, a easy problem to apply deep Q learning with convolutional neural network, to test the code implementation. The problem was solved relatively easy, and unfortunately the same code didn't work on the Atari games.

I used the template code from the [UCB RL course homework](https://github.com/berkeleydeeprlcourse/homework) to solve the Atari games. It is a deep Q learning algorithm, with some best practice, including double Q networks. The agent constantly achieved a average reward of over 20 on Pong-v0 after 4.3M of game steps.
