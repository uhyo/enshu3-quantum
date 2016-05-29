fid = fopen('../data/hadamard-line.txt', 'r', 'native');

data = fscanf(fid, '%d %f',[2, Inf]);

figure(1);
clf;
plot(data(1,:), data(2,:), 'r-', 'linewidth', 3);

xlabel('m');
ylabel('r_m');
