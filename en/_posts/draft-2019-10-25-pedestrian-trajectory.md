---
layout: post
title: Pedestrian trajectory prediction with deep learning
comments: true
description: >
  Being able to predict trajectories of people is useful for obvious applications such as human interactive robotics and autonomous vehichles. There is also an interest in team sport since it could provide insight for tactical analsis. In this post, I write about the basics of Pedestrian Trajectory Prediction. In the next post I will write about Multi-Agent Trajcetory prediciton (e.g. tracking in team sport).
excerpt_separator: <!--more-->
---

# Pedestrian trajectory prediction with deep learning
{:.no_toc}

- toc
{:toc}

※ Images are from the papers described unless source is made clear otherwise.

#  What is Trajectory Prediction?

**Trajcetory Prediction** is challenge of predicting a single/multi persons movement through ground level 2D space from given information (video frames or trajectory coordinates). 

- **Trajectory Prediction from Coordinates** - Estimate future trajectories using 2D coordinates.
- **Trajectory Prediction from Video** - Estimate future trajectories using RGB images from video.

![](/assets/img/blog/peek.gif)

# Why is it hard?

The difficulty in predicting trajectories arises from the complexity of human behaviour. Movement is rarely driven solely by destination but also by the existence of surrounding agents (social relations between agents, social rules and norms) and environmental factors (topology, geometry, semantics etc.).

For example, think of a pedestrian walking from point A to point B. It's raining and there could be a puddle. It is obvious to us that the pedestrian is likely to walk around the puddle but such semantic information is not well known to the machine. 

Another example could be of 2 people walking towards each other in opposite directions. How does the computer infer the distance a pedestrian deviates for his path to make way for the other person? Such seemingly trivial factors are reminiscent of [Moravec's paradox](https://en.wikipedia.org/wiki/Moravec%27s_paradox) and are the cause of difficulty.
 
# Classical Approach

The traditional Social Force model was pioneered by Helbing and Molnar. This method modelled attractive and repulsive forces between pedestrians to describe pedestrian behaviour. Similar approaches such as continuum dynamics and modelling with the Gaussian processes were also used.

Using well-engineered features is also common in improving tracking and forecasting. Alahi et. al. presented a social affinity feature by learning from human trajectories in crowds.

Another line of work from Kitani et. al. uses Inverse Reinforcement Learning to predict human paths in scenes.

## Papers Covered

- [Social force model for pedestrian dynamics](#social-force-model-for-pedestrian-dynamics-paper)
- [Activity Forecasting](#activity-forecasting-paper)
- [Socially-aware Large-scale Crowd Forecasting](#socially-aware-large-scale-crowd-forecasting-paper)

**Note** I must say that the latter 2 papers are relatively recent and may not be considered classical!

## Social force model for pedestrian dynamics [[paper]](https://www.researchgate.net/publication/1947096_Social_Force_Model_for_Pedestrian_Dynamics?enrichId=rgreq-d0f2bf8feb2f3bfc4d0db72c2d8c4e2e-XXX&enrichSource=Y292ZXJQYWdlOzE5NDcwOTY7QVM6MTAyNjMzMjE3OTg2NTY0QDE0MDE0ODEwNzQ3NTE%3D&el=1_x_2&_esc=publicationCoverPdf)

In this paper, the behaviour of the pedestrian is thought to be effected by repulsive forces (strangers, walls, etc.) and attractive forces (friends, street artists, etc.).

![](/assets/img/blog/2019-10-26-22-33-58.png){:.lead data-width="800" data-height="100"}
Types of social forces.
{:.figure}

![](/assets/img/blog/2019-10-26-22-34-33.png){:.lead data-width="800" data-height="100"}
Sum of all effects to the pedestrians velocity.
{:.figure}

**The main idea** is that a pedestrian would walk in a straight line from A to B at a desired speed if there were no external forces, but will deviate from the straight line by repulsive forces and attractive forces.

Using the model described above, we can simulate the movement of pedestrians by assuming the desired speeds to be, for example, gaussian distributed with mean $$v_0 = 1.34ms^{-1}$$ and standard deviation $$\sqrt{\theta} = 0.26ms^{-1}$$ (as in the paper) or simply a constant $$v_\alpha = 1.5ms^{-1}$$.

## Activity Forecasting [[paper]](https://www.ri.cmu.edu/pub_files/2012/10/Kitani-ECCV2012.pdf)

In contrast to the Social Forces paper, where coordinates were used as input, here the paths are predicted given an image as input. 

![](/assets/img/blog/2019-10-26-23-21-04.png){:.lead data-width="800" data-height="100"}
Example of plausible paths and destinations from noisy vision input.
{:.figure}

**The main idea** is 1. incorporate information of physical scene features and human preferences towards them (e.g. A person is more likely to walk on a side walk rather than on the street) and 2. prior knowledge of goals (e.g. A person who wants to get to a car on the direct other side of the street will cross the street if it seems safe, even if there is a zebra crossing ahead).

These two aspects are integrated into modelling human activity with semantic scene labelling and inverse optimal control (A.K.A Inverse Reinforcement Learning).

![](/assets/img/blog/2019-10-26-23-51-10.png){:.lead data-width="800" data-height="100"}
[src](https://jsteinhardt.wordpress.com/2017/02/07/model-mis-specification-and-inverse-reinforcement-learning/) for image on the right.
{:.figure}

## Socially-aware Large-scale Crowd Forecasting [[paper]](#socially-aware-large-scale-crowd-forecasting-paper)

This paper was introduced along-side with a dataset of 42 million trajectories extracted from real-world train stations.

![](/assets/img/blog/2019-10-27-00-27-39.png)

**The main idea** was a newly proposed feature named Social Affinity Map (SAM) and to address the lack of appearance information and the weak independent motion prior in linking fragmented trajectories.

# Deep Learning Approach

### Papers Covered

- [Social LSTM: Human Trajectory Prediction in Crowded Spaces(2016)](#social-lstm-human-trajectory-prediction-in-crowded-spaces2016-paper)
- [SocialGAN: Socially Acceptable Trajectories with Generative Adversarial Networks (2018)](#socialgan-socially-acceptable-trajectories-with-generative-adversarial-networks-2018-paper)
- [SoPhie: An Attentive GAN for Predicting Paths Compliant to Social and Physical Constraints (2018)](http://127.0.0.1:4000/blog/en/2019-10-25-pedestrian-trajectory/#sophie-an-attentive-gan-for-predicting-paths-compliant-to-social-and-physical-constraints-2018-paper)
- [Peeking into the Future: Predicting Future Person Activities and Locations in Videos (2019)](http://127.0.0.1:4000/blog/en/2019-10-25-pedestrian-trajectory/#peeking-into-the-future-predicting-future-person-activities-and-locations-in-videos-2019-paper)

## Social LSTM: Human Trajectory Prediction in Crowded Spaces(2016) [[paper](http://cvgl.stanford.edu/papers/CVPR16_Social_LSTM.pdf)]

This paper was one of the first to implement an RNN to predict pedestrian trajectories. The authors used a pooling based LSTM model which jointly predicts the trajectories of all the people in a scene. 

![](/assets/img/blog/2019-10-27-17-04-24.png){:.lead data-width="800" data-height="100"}
Overview of the Social-LSTM method
{:.figure}

**The main idea** is to capture the interactions of neighbouring people by pooling the hidden states of several LSTMs that each model a single pedestrian. In contrast, the naive use of one LSTM model per person would be agnostic to the behaviour of other sequences.

### Results
![](/assets/img/blog/2019-10-27-17-17-41.png){:.lead data-width="800" data-height="100"}
Look at SF(social forces) and Social-LSTM.
{:.figure}

### Comments

- The Social-LSTM is generally better than traditional models such as Social Force.
- Social Force has the best average final displacement error.
- Social-LSTM doesn't use semantic scene information and still gets good results!

## SocialGAN: Socially Acceptable Trajectories with Generative Adversarial Networks (2018) [[paper](https://zpascal.net/cvpr2018/Gupta_Social_GAN_Socially_CVPR_2018_paper.pdf)]

Social-GAN improves on Social-LSTM by adding a discriminator module.

![](/assets/img/blog/2019-10-28-14-49-32.png){:.lead data-width="800" data-height="100"}
System overiew.
{:.figure}

**The main idea** is that by using a GAN like architecture the generator and discriminator will play a minimax game that eventually improves the output.

### Results

![](/assets/img/blog/2019-10-28-14-54-45.png){:.lead data-width="800" data-height="100"}
Metrics for Social-GAN
{:.figure}


### Comments


## SoPhie: An Attentive GAN for Predicting Paths Compliant to Social and Physical Constraints (2018) [[paper](https://arxiv.org/pdf/1806.01482.pdf)]

![](/assets/img/blog/2019-10-28-15-05-17.png){:.lead data-width="800" data-height="100"} 
 Results 
{:.figure}

### Results

![](/assets/img/blog/2019-10-28-15-06-57.png){:.lead data-width="800" data-height="100"} 
 Results 
{:.figure}

### Comments


## Peeking into the Future: Predicting Future Person Activities and Locations in Videos (2019) [[paper](http://openaccess.thecvf.com/content_CVPR_2019/papers/Liang_Peeking_Into_the_Future_Predicting_Future_Person_Activities_and_Locations_CVPR_2019_paper.pdf)]

![](/assets/img/blog/2019-10-28-15-37-36.png){:.lead data-width="800" data-height="100"}
System overview
{:.figure}

### Results
![](/assets/img/blog/2019-10-28-15-36-38.png){:.lead data-width="800" data-height="100"}
 Results 
 {:.figure}

### Comments
